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
  msg:string
  // Attribut permettant d'afficher ou non le message d'alert msg
  alertActive:boolean = false;
  // Attribut permettant de définir le style de l'alerte
  alertClass:string;
  // Types d'absences
  absTypes:any = ABSENCES_TYPES;

  constructor(private absenceService: AbsenceService,private loginService: LoginService) {}

  ngOnInit() {
    // récupération du collaborateur connecté
    this.loginService.subjectCollaborateur.subscribe(
      data => (this.collaborateur = data)
    );

    // Récupération des absences
    this.collaborateur.subalternes.forEach(matricule => {
      this.absenceService.abencesEnAttenteSubj.subscribe(result => {
        result.forEach(abs => {
          if(abs.collaborateur.matricule === matricule) {
            this.absences.push(abs);
          }
        });
      });
    })
  }

  valider(absence:Absence) {
    absence.statut = AbsenceStatut.VALIDEE;
    this.absenceService.validerOuRejeterAbsence(absence).subscribe(result => {
      this.alertActive = true;
      this.alertClass = "alert-success";
      this.msg = "L'absence n°"+ result.id + " est validée";
      
      // Mise à jour des absences suite à la soumission du formulaire
      this.absenceService.refreshAbsencesByMatricule();
      
    },err => {
      this.alertActive = true;
      this.alertClass = "alert-danger";
      this.msg = err.error.message;
      // Mise à jour des absences suite à la soumission du formulaire
      this.absenceService.refreshAbsencesByMatricule();

    });

  }

  rejeter(absence:Absence) {
    absence.statut = AbsenceStatut.REJETEE;
    this.absenceService.validerOuRejeterAbsence(absence).subscribe(result => {
      this.alertActive = true;
      this.alertClass = "alert-success";
      this.msg = "L'absence n°"+ result.id + " est rejetée";
      
      // Mise à jour des absences suite à la soumission du formulaire
      this.absenceService.refreshAbsencesByMatricule();
      
    },err => {
      this.alertActive = true;
      this.alertClass = "alert-danger";
      this.msg = err.error.message;
      // Mise à jour des absences suite à la soumission du formulaire
      this.absenceService.refreshAbsencesByMatricule();

    });

  }
  
  // Fermeture de l'alert par la croix
  closeAlert() {
		this.alertActive = false;
  }
}
