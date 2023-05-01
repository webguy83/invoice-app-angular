import { ReactiveFormsModule } from '@angular/forms';
import { LoadingService } from './shared/loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { InvoicesModule } from './invoices/invoices.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { SharedModule } from './shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { InvoiceFormComponent } from './form/invoice-form/invoice-form.component';
import { BillFromFormComponent } from './form/sub-forms/bill-from-form/bill-from-form.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, InvoiceFormComponent, BillFromFormComponent],
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    BrowserModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    InvoicesModule,
    SharedModule,
    MatSidenavModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent],
  providers: [LoadingService],
})
export class AppModule {}
