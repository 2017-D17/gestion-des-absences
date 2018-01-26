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
import { HttpModule } from '@angular/http';
import { JwtModule } from '@auth0/angular-jwt';
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
import { AuthService } from "./shared/service/auth.service";
import { AuthGuardService } from "./shared/service/auth-guard.service";
import { RoleGuardService } from "./shared/service/role-guard.service";
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from "../environments/environment";
import { getToken } from "./token-getter";

const appRoutes: Routes = [
  { path: "connexion", component: AuthentificationComponent },
  { path: "accueil", component: AccueilComponent },
  { path: "PlanningDesAbsences", component: PlanningDesAbsencesComponent, canActivate: [RoleGuardService] },
  {
    path: "GestionDesAbsences",
    component: GestionDesAbsencesComponent,
    canActivate: [RoleGuardService]
  },
  { path: "VueSynthetique", component: VueSynthetiqueComponent, canActivate: [RoleGuardService], data: { expectedRole: 'MANAGER' } },
  { path: "ValidationDesAbsences", component: ValidationDemandesComponent, canActivate: [RoleGuardService], data: { expectedRole: 'MANAGER' } },
  { path: "JoursFeries", component: JoursFeriesComponent, canActivate: [RoleGuardService] },
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
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: [
          environment.urlBackEndAbsences,
          environment.urlBackEndJoursFeries,
          'localhost:8080',
          'gestion-des-absences.herokuapp.com/'
        ],
        throwNoTokenError: true,
        skipWhenExpired: true
      }
    })
  ],
  providers: [
    AbsenceService,
    JoursFeriesService,
    DateFormatterServiceService,
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    AuthService,
    AuthGuardService,
    RoleGuardService,
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
