import { Component, OnInit } from '@angular/core';
import { IPatient } from 'src/app/models/patient';
import { Store, select } from '@ngrx/store';
import * as UserActions from '../../store/actions/user.actions';
import * as fromUser from '../../store/selectors/user.selectors';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
})
export class PatientListComponent implements OnInit {
  pageTitle: string = 'Patient Management App';
  errorMessage: string = '';
  users: IPatient[] = [];
  openModal = false;
  currentItem: any;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getPatiens();
  }

  getPatiens(): void {
    this.store.dispatch(new UserActions.LoadUsers());
    this.store.pipe(select(fromUser.getUsers)).subscribe((users) => {
      this.users = users;
      this.currentItem = {
        selectedAction: 0,
        selectedPatient: '',
        closePopup: true,
      };
    });

    this.store.pipe(select(fromUser.getError)).subscribe((err) => {
      this.errorMessage = err;
      this.currentItem = {
        selectedAction: 1,
        selectedPatient: '',
        closePopup: true,
      };
    });
  }

  openAddPatient(): void {
    this.openModal = true;
    this.currentItem = {
      selectedAction: 1,
      selectedPatient: '',
      closePopup: false,
    };
  }

  openDeletePatient(id: number): void {
    this.openModal = true;
    this.currentItem = {
      selectedAction: 2,
      selectedPatient: id,
      closePopup: false,
    };
  }

  openViewPatient(patient: IPatient): void {
    this.openModal = true;
    this.currentItem = {
      selectedAction: 3,
      selectedPatient: patient,
      closePopup: false,
    };
  }

  modalClose(event: boolean): void {
    this.openModal = false;
  }
}
