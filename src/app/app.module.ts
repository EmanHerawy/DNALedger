import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRouts } from './app.routing';
import {
  HomeComponent, CitizenAddComponent, CitizenEditComponent, CitizenListComponent,
  AddAuthComponent, AddDNAComponent, CitizenSearchComponent, AuthComponent
} from './index';
import { IdentityLedgerService } from './identity-ledger.service';
import { OffChainLedgerService } from './/off-chainLedger.service';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, CitizenListComponent,
    AddAuthComponent, AddDNAComponent, CitizenAddComponent, CitizenEditComponent, CitizenSearchComponent, AuthComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRouts),
    FormsModule, ReactiveFormsModule,
    HttpModule
  ],
  providers: [IdentityLedgerService, OffChainLedgerService],
  bootstrap: [AppComponent]
})
export class AppModule { }


