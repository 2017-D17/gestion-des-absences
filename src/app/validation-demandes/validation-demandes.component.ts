import { Component, OnInit } from "@angular/core";
import { Absence } from "../shared/domain/absence";
import { AbsenceService } from "../shared/service/absence.service";
import { AbsenceStatut, ABSENCES_STATUS } from '../shared/domain/absence-statut.enum';
import { AbsenceType, ABSENCES_TYPES} from "../shared/domain/absence-type.enum";
import { Collaborateur } from "../shared/domain/collaborateur";
import { LoginService } from "../shared/service/login.service";

@Component({
  selector: "app-validation-demandes",
  templateUrl: "./validation-demandes.component.html",
  styleUrls: ["./validation-demandes.component.css"]
})
export class ValidationDemandesComponent implements OnInit {
  // Collaborateur connecté
  collaborateur:Collaborateur;
  absences: Absence[] = [];
  // Message d'erreur ou de succès suite à l'envoi des données sur le serveur
  msg: string
  // Attribut permettant d'afficher ou non le message d'alert msg
  alertActive: boolean = false;
  // Attribut permettant de définir le style de l'alerte
  alertClass: string;
  // Types d'absences
  absTypes: any = ABSENCES_TYPES;

  constructor(private absenceService: AbsenceService,private loginService: LoginService) {}


  ngOnInit() {
    // récupération du collaborateur connecté
    this.collaborateur = this.loginService.getConnectedUser();
    
    // Récupération des absences
    this.listerAbsences();
    
  }

  valider(absence: Absence) {
    absence.statut = AbsenceStatut.VALIDEE;
    // on enlève le collaborateur pour que la requête passe au niveau du serveur
    let abs:Absence = new Absence(absence.id,absence.dateDebut,absence.dateFin,absence.type,absence.motif,absence.statut);
    this.absenceService.validerOuRejeterAbsence(abs).subscribe(result => {
      this.alertActive = true;
      this.alertClass = "alert-success";
      this.msg = "L'absence n°" + result.id + " est validée";
      // this.absences.
      this.absenceService.listerAbsencesParStatut();
      this.listerAbsences();

    }, err => {
      this.alertActive = true;
      this.alertClass = "alert-danger";
      this.msg = err.error.message;
      this.absenceService.listerAbsencesParStatut();
    });
  }

  rejeter(absence: Absence) {
    absence.statut = AbsenceStatut.REJETEE;
    // on enlève le collaborateur pour que la requête passe au niveau du serveur
    let abs:Absence = new Absence(absence.id,absence.dateDebut,absence.dateFin,absence.type,absence.motif,absence.statut);
    this.absenceService.validerOuRejeterAbsence(abs).subscribe(result => {
      this.alertActive = true;
      this.alertClass = "alert-success";
      this.msg = "L'absence n°" + result.id + " est rejetée";
      this.absenceService.listerAbsencesParStatut();
    }, err => {
      this.alertActive = true;
      this.alertClass = "alert-danger";
      this.msg = err.error.message;
      this.absenceService.listerAbsencesParStatut();

    });
  }

  listerAbsences() {
    this.absences = [];
    this.collaborateur.subalternes.forEach(matricule => {
      this.absenceService.listerAbsencesParStatut().subscribe(result => {
        result.forEach(abs => {
          if(abs.collaborateur.matricule === matricule) {
            this.absences.push(abs);
          }
        });
      });
    });
  }

  // Fermeture de l'alert par la croix
  closeAlert() {
    this.alertActive = false;
  }
}
