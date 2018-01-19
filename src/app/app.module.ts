import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
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
import { ButtonsModifSuppComponent } from './buttons-modif-supp/buttons-modif-supp.component';

const appRoutes: Routes = [
  { path: "connexion", component: AuthentificationComponent },
  { path: "accueil", component: AccueilComponent },
  { path: "PlanningDesAbsences", component: PlanningDesAbsencesComponent },
  {
    path: "GestionDesAbsences",
    component: GestionDesAbsencesComponent
  },
  { path: "VueSynthetique", component: VueSynthetiqueComponent },
  { path: "JoursFeries", component: JoursFeriesComponent },
  { path: "**", redirectTo: "accueil" }
];
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AccueilComponent,
    AuthentificationComponent,
    GestionDesAbsencesComponent,
    PlanningDesAbsencesComponent,
    JoursFeriesComponent,
    VueSynthetiqueComponent,
    ButtonsModifSuppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AbsenceService],
  bootstrap: [AppComponent]
})
export class AppModule {}
