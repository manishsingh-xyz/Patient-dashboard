import { Action } from '@ngrx/store';
import { IPatient } from '../../models/patient';
export enum UserActionTypes {
  LoadUsers = '[User] Load Users',
  LoadUsersSuccess = '[User] Load Users Success',
  LoadUsersFailure = '[User] Load Users Failure',
  
  DeleteUser = 'Delete User',
  DeleteUserSuccess = 'Delete User Success',
  DeleteUserFaliure = 'Delete User Faliure',

  AddUser = 'Add User',
  AddUserSuccess = 'Add User Success',
  AddUserFaliure = 'Add User Faliure'
}

export class LoadUsers implements Action {
  readonly type = UserActionTypes.LoadUsers;
}

export class LoadUsersSuccess implements Action {
  readonly type = UserActionTypes.LoadUsersSuccess;
  constructor(public payload: { data: IPatient[] }) { }
}

export class LoadUsersFailure implements Action {
  readonly type = UserActionTypes.LoadUsersFailure;
  constructor(public payload: { error: string }) { }
}

export class DeleteUser implements Action {
  readonly type = UserActionTypes.DeleteUser;
  constructor(readonly payload: any) { }
}

export class DeleteUserSuccess implements Action {
  readonly type = UserActionTypes.DeleteUserSuccess;
  constructor(readonly payload: any) { }
}

export class DeleteUserFaliure implements Action {
  readonly type = UserActionTypes.DeleteUserFaliure;
  constructor(public payload: { error: string }) { }
}

export class AddUser implements Action {
  readonly type = UserActionTypes.AddUser;
  constructor(readonly payload: any) { }
}

export class AddUserSuccess implements Action {
  readonly type = UserActionTypes.AddUserSuccess;
  constructor(readonly payload: any) { }
}

export class AddUserFaliure implements Action {
  readonly type = UserActionTypes.AddUserFaliure;
  constructor(public payload: { error: string }) { }
}

export type UserActions = LoadUsers | LoadUsersSuccess | LoadUsersFailure | DeleteUser | DeleteUserSuccess | DeleteUserFaliure | AddUser | AddUserSuccess | AddUserFaliure;

