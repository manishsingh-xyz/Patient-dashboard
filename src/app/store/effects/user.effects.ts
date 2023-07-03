import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as userActions from '../actions/user.actions';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { DataService } from '../../services/data.service';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private dataService: DataService) {}

  @Effect()
  loadUsers$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.UserActionTypes.LoadUsers),
    mergeMap((action) =>
      this.dataService.getUsers().pipe(
        map((users) => new userActions.LoadUsersSuccess({ data: users })),
        catchError((err) =>
          of(new userActions.LoadUsersFailure({ error: err }))
        )
      )
    )
  );

  @Effect()
  DeleteUsers$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.UserActionTypes.DeleteUser),
    switchMap((action: any) => {
      let id = action.payload;
      return this.dataService.deletePatient(id).pipe(
        map((users) => new userActions.DeleteUserSuccess(id)),
        catchError((err) =>
          of(new userActions.DeleteUserFaliure({ error: err }))
        )
      );
    })
  );

  @Effect()
  AddUsers$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.UserActionTypes.AddUser),
    switchMap((action: any) => {
      let postData = action.payload;
      return this.dataService.addPatient(postData).pipe(
        map((users) => new userActions.AddUserSuccess(users)),
        catchError((err) =>
          of(new userActions.AddUserFaliure({ error: err }))
        )
      );
    })
  );
}
