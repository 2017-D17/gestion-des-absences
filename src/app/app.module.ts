import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AbsenceService } from './shared/service/absence.service';
import { FormAbsenceComponent } from './form-absence/form-absence.component';

@NgModule({
  declarations: [
    AppComponent,
    FormAbsenceComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpClientModule,
    FormsModule,
  ],
  providers: [AbsenceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
