import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IPatient } from '../models/patient';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  //private userUrl = 'assets/users.json';
  private apiUrl = 'https://patient-data-b8eu.onrender.com/patients';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<IPatient[]> {
    return this.http.get<IPatient[]>(this.apiUrl).pipe(
      tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }

  addPatient(params): Observable<IPatient[]> {
    return this.http.post<IPatient[]>(this.apiUrl, params).pipe(
      tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }

  deletePatient(params): Observable<IPatient[]> {
    return this.http.delete<any>(this.apiUrl + '/' + params).pipe(
      tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}`;
    }
    return throwError(errorMessage);
  }
}
