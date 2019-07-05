import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { BehaviorSubject, of, empty } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { AnalyticsService } from './analytics.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: BehaviorSubject<any>;
  user: any;
  dummyUser: any = {
    displayName: '',
    swipes: 0,
    saved: [],
    uid: null
  };

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router,
    private analyticsService: AnalyticsService
    ) {
    const cachedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : this.dummyUser;

    this.user$ = new BehaviorSubject(cachedUser);

    this.afAuth.authState.pipe(
      switchMap((user: any) => user
        ? this.afStore.doc<any>(`users/${user.uid}`).valueChanges()
        : of(cachedUser)),
      catchError(error => {
        console.log('uh oh, something went horribly wrong', error);
        return empty();
      })
    ).subscribe(user => {
      this.user = user;
      if (user) {
        this.user$.next(user);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        this.user$.next(null);
        localStorage.removeItem('user');
      }
    });
  }

  async loginWithGoogle() {
    const authData = await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    if (authData && authData.additionalUserInfo && authData.additionalUserInfo.isNewUser) {
      await this.createUserDoc(authData.user);
    }
    this.analyticsService.signIn();
  }

  async logout() {
    await this.afAuth.auth.signOut();
    this.user$.next(this.dummyUser);
    localStorage.removeItem('user');
    this.analyticsService.signOut();
    return this.router.navigateByUrl('/');
  }

  createUserDoc({ uid, displayName, email, phoneNumber, photoURL }) {
    const userDoc = this.afStore.doc(`users/${uid}`);

    const data = {
      uid,
      displayName,
      email,
      phoneNumber,
      photoURL,
      swipes: 0,
      saved: []
    };

    return userDoc.set(data);
  }

  updateUserDoc(obj: any) {
    if (!this.user || !this.user.uid || !obj) {
      return 'cannot update user';
    }

    return this.afStore.doc(`users/${this.user.uid}`).update(obj);
  }
}
