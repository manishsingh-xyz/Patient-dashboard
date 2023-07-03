import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/user.effects';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, PatientListComponent, AddPatientComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, StoreModule.forRoot(reducers, {
    metaReducers,
    runtimeChecks: {
      strictStateImmutability: true,
      strictActionImmutability: true,
    }
  }), !environment.production ? StoreDevtoolsModule.instrument() : [], EffectsModule.forRoot([UserEffects])],
  providers: [],
  bootstrap: [AppComponent], // default component
})
export class AppModule { }
