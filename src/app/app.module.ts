import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from "@angular/core";
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { NgbModule, NgbDatepickerModule, NgbTimepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { MenuComponent } from "./menu/menu.component";
import { AccueilComponent } from "./accueil/accueil.component";
import { AuthentificationComponent } from "./authentification/authentification.component";
import { AbsenceService } from "./shared/service/absence.service";
import { HttpClientModule } from "@angular/common/http";
import { PlanningDesAbsencesComponent } from "./planning-des-absences/planning-des-absences.component";
import { JoursFeriesComponent } from "./jours-feries/jours-feries.component";
import { VueSynthetiqueComponent } from "./vue-synthetique/vue-synthetique.component";
import { GestionDesAbsencesComponent } from "./gestion-des-absences/gestion-des-absences.component";
import { ButtonsModifSuppComponent } from "./buttons-modif-supp/buttons-modif-supp.component";
import { FormsModule } from "@angular/forms";
import { FormAbsenceComponent } from "./form-absence/form-absence.component";
import { MyDatePickerModule } from "mydatepicker";
import { VALID } from "@angular/forms/src/model";
import { ValidationDemandesComponent } from "./validation-demandes/validation-demandes.component";
import { FormJourFerieComponent } from "./form-jour-ferie/form-jour-ferie.component";
import { JoursFeriesService } from "./shared/service/jours-feries.service";
import { SuprimerJourFerieComponent } from "./suprimer-jour-ferie/suprimer-jour-ferie.component";
import { CalendarModule } from 'angular-calendar';
import { DateFormatterServiceService } from "./calendar/service/date-formatter-service.service";
import { UtilsCalendarHeaderComponent } from './calendar/utils/utils-calendar-header/utils-calendar-header.component';
import { FiltreCongesParAnneeComponent } from './filtre-conges-par-annee/filtre-conges-par-annee.component';
import { YearFilterPipe } from './shared/pipe/year-filter.pipe';
import { LoginService } from "./shared/service/login.service";
import { TableauDeptJourCollabComponent } from './tableau-dept-jour-collab/tableau-dept-jour-collab.component';
import { CongesJourCollabFilterPipe } from './shared/pipe/conges-jour-collab-filter.pipe';


const appRoutes: Routes = [
  { path: "connexion", component: AuthentificationComponent },
  { path: "accueil", component: AccueilComponent },
  { path: "PlanningDesAbsences", component: PlanningDesAbsencesComponent },
  { path: "GestionDesAbsences", component: GestionDesAbsencesComponent },
  { path: "VueSynthetique", component: VueSynthetiqueComponent },
  { path: "ValidationDesAbsences", component: ValidationDemandesComponent },
  { path: "JoursFeries", component: JoursFeriesComponent },
  { path: "tableauSynthetique", component: TableauDeptJourCollabComponent},
  { path: "**", redirectTo: "connexion" }
];
registerLocaleData(localeFr);
@NgModule({
  declarations: [
    AppComponent,
    FormAbsenceComponent,
    MenuComponent,
    AccueilComponent,
    AuthentificationComponent,
    GestionDesAbsencesComponent,
    PlanningDesAbsencesComponent,
    JoursFeriesComponent,
    VueSynthetiqueComponent,
    ButtonsModifSuppComponent,
    ValidationDemandesComponent,
    SuprimerJourFerieComponent,
    FormJourFerieComponent,
    UtilsCalendarHeaderComponent,
    FiltreCongesParAnneeComponent,
    YearFilterPipe,
    TableauDeptJourCollabComponent,
    CongesJourCollabFilterPipe,
    
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpClientModule,
    FormsModule,
    MyDatePickerModule,
    RouterModule.forRoot(appRoutes),
    CalendarModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [AbsenceService, JoursFeriesService, LoginService, DateFormatterServiceService,{provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent]
})
export class AppModule {}
