import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRouts } from './app.routing';
import {
  HomeComponent, CitizenAddComponent, CitizenEditComponent, CitizenListComponent,
  AddAuthComponent, AddDNAComponent, CitizenSearchComponent, AuthComponent, CitizenComponent
} from './index';
import { IdentityLedgerService } from './identity-ledger.service';
import { OffChainLedgerService } from './/off-chainLedger.service';
import { AngularFireModule } from 'angularfire2';

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
  apiKey: "put your firebase configuration ",
  authDomain: "put your firebase configuration",
  databaseURL: "put your firebase configuration",
  projectId: "put your firebase configuration",
  storageBucket: "put your firebase configuration",
  messagingSenderId: "put your firebase configuration"
};
@NgModule({
  declarations: [
    AppComponent, HomeComponent, CitizenListComponent, CitizenComponent,
    AddAuthComponent, AddDNAComponent, CitizenAddComponent, CitizenEditComponent, CitizenSearchComponent, AuthComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRouts),
    FormsModule, ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [IdentityLedgerService, OffChainLedgerService],
  bootstrap: [AppComponent]
})
export class AppModule { }


