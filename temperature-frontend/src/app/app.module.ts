import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ChartsModule} from 'ng2-charts/ng2-charts';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GraphComponent} from './graph/graph.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    GraphComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ChartsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatButtonModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
