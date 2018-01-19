import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { MenuComponent } from "./menu/menu.component";
import { AccueilComponent } from "./accueil/accueil.component";
import { AuthentificationComponent } from "./authentification/authentification.component";
import { GestionDeAbsencesComponent } from "./gestion-de-absences/gestion-de-absences.component";
import { AbsenceService } from "./shared/service/absence.service";
import { HttpClientModule } from "@angular/common/http";
const appRoutes: Routes = [
  { path: "accueil", component: AccueilComponent },
  { path: "GestionDesAbsences", component: GestionDeAbsencesComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AccueilComponent,
    AuthentificationComponent,
    GestionDeAbsencesComponent
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
