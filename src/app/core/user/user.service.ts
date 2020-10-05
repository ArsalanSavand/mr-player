import { Injectable } from '@angular/core';
import { User } from '@app/interfaces/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  /**
   * @description
   *
   * Authentication user subject which emits authenticated user's data information value whenever it is subscribed to.
   *
   * @see BehaviorSubject
   */
  private static userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  /**
   * @description
   *
   * An observable snapshot data of {@link userSubject} value
   *
   * @see Observable
   */
  static userObservable: Observable<User> = UserService.userSubject.asObservable();

  constructor() {
  }

  /**
   * @description
   *
   * Set and update current authenticated user's data by updating {@link userSubject}'s value and local storage's
   * 'user' item
   *
   * @param data User data information
   */
  static set user(data: User) {
    localStorage.setItem('user', JSON.stringify(data));
    UserService.userSubject.next(data);
  }

  /**
   * @returns Latest authenticated user's data information from local storage
   */
  static get user(): User {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'));
    }
    return null;
  }

  /**
   * @returns Whether the authenticated user is the user
   *
   * @param user User to check
   */
  static isUser(user: User): boolean {
    return UserService.userSubject.value && UserService.userSubject.value.id === user.id;
  }

  /**
   * @returns Whether the authenticated user is one of the users
   *
   * @param users Users to check
   */
  static isAnyUser(users: User[]): boolean {
    return UserService.userSubject.value && users.some(user => user.id === UserService.userSubject.value.id);
  }
}
