import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as UserActions from '../../store/actions/user.actions';
import * as fromUser from '../../store/selectors/user.selectors';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css'],
})
export class AddPatientComponent implements OnInit {
  selected = 0;
  popupHeading = '';
  patientName: string;
  patientAddress: string;
  patientClinic: string;
  autoClose = false;
  buttonDisabled = false;
  @Input() item: any;
  @Output() modalCloseEvent = new EventEmitter<boolean>();
  @ViewChild('closeAddPatientModal') closeAddExpenseModal: ElementRef;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.intializeModal();
  }

  ngOnChanges(): void {
    if (this.item.closePopup) this.closeAddExpenseModal.nativeElement.click();
  }

  intializeModal(): void {
    if (this.item.selectedAction === 1) {
      this.selected = 1;
      this.popupHeading = 'Add Patient';
    } else if (this.item.selectedAction === 2) {
      this.selected = 2;
      this.popupHeading = 'Delete Patient';
    } else {
      this.popupHeading = 'View Patient';
      this.selected = 3;
    }
  }

  onSubmit(): void {
    this.buttonDisabled  = true;
    if (this.selected === 1) this.addPatient();
    else if (this.selected === 2) this.deletePatient();
  }

  addPatient(): void {
    let params = {
      id: Math.floor(Math.random() * 100),
      name: this.patientName,
      address: this.patientAddress,
      clinic: this.patientClinic,
    };
    this.store.dispatch(new UserActions.AddUser(params));
  }

  deletePatient(): void {
    this.store.dispatch(
      new UserActions.DeleteUser(this.item.selectedPatient)
    );
  }

  closeModal(): void {
    this.buttonDisabled  = false;
    this.selected = 0;
    this.popupHeading = '';
    this.modalClose();
  }

  modalClose(): void {
    this.buttonDisabled  = false;
    this.modalCloseEvent.emit(this.autoClose);
    this.autoClose = false;
  }
}
