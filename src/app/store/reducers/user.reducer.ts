import { Action } from '@ngrx/store';
import { UserActions, UserActionTypes } from '../actions/user.actions';
import { IPatient } from '../../models/patient';

export const userFeatureKey = 'usersState';

export interface State {
  users: IPatient[];
  error: string;
}

export const initialState: State = {
  users: [],
  error: '',
};

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case UserActionTypes.LoadUsers:
      return {
        ...state,
      };

    case UserActionTypes.LoadUsersSuccess:
      return {
        ...state,
        users: action.payload.data,
        error: '',
      };

    case UserActionTypes.LoadUsersFailure:
      return {
        ...state,
        users: [],
        error: action.payload.error,
      };

    case UserActionTypes.DeleteUserSuccess:
      let modifiedArray = state.users;
      modifiedArray = modifiedArray.filter((item) => {
        return item.id !== action.payload;
      });
      return {
        ...state,
        users: modifiedArray,
        error: '',
      };

    case UserActionTypes.DeleteUserFaliure:
      return {
        ...state,
        users: [],
        error: action.payload.error,
      };

    case UserActionTypes.AddUserSuccess:
      let newArray = Object.assign([], state.users);
      newArray = [...newArray, action.payload]
      return {
        ...state,
        users: newArray,
        error: '',
      };

    case UserActionTypes.AddUserFaliure:
      return {
        ...state,
        users: [],
        error: action.payload.error,
      };

    default:
      return state;
  }
}
