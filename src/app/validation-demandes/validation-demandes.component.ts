import { Component, OnInit } from "@angular/core";
import { Absence } from "../shared/domain/absence";
import { AbsenceService } from "../shared/service/absence.service";
import { AbsenceStatut, ABSENCES_STATUS } from '../absence-statut.enum';

@Component({
  selector: "app-validation-demandes",
  templateUrl: "./validation-demandes.component.html",
  styleUrls: ["./validation-demandes.component.css"]
})
export class ValidationDemandesComponent implements OnInit {
  absences: Absence[] = [];
  // Message d'erreur ou de succès suite à l'envoi des données sur le serveur
  msg:string
  // Attribut permettant d'afficher ou non le message d'alert msg
  alertActive:boolean = false;
  // Attribut permettant de définir le style de l'alerte
  alertClass:string;

  constructor(private absenceService: AbsenceService) {}

  ngOnInit() {
    this.absenceService.absenceSubj.subscribe(result => {
      console.log(result);
      this.absences = result.filter(abs => abs.statut === AbsenceStatut.EN_ATTENTE_VALIDATION);
    });
  }

  valider(absence:Absence) {
    console.log('valider absence ',absence);
    absence.statut = AbsenceStatut.VALIDEE;
    this.absenceService.validerOuRejeterAbsence(absence).subscribe(result => {
      this.alertActive = true;
      this.alertClass = "alert-success";
      this.msg = "L'absence n°"+ result.id + " est validée";
      console.log('result ',result);
      
      // Mise à jour des absences suite à la soumission du formulaire
      this.absenceService.refreshAbsencesByMatricule();
      
    },err => {
      console.log(err);
      this.alertActive = true;
      this.alertClass = "alert-danger";
      this.msg = err.error.message;
      // Mise à jour des absences suite à la soumission du formulaire
      this.absenceService.refreshAbsencesByMatricule();

    });

  }

  rejeter(absence:Absence) {
    absence.statut = AbsenceStatut.REJETEE;
    console.log('rejeter absence ',absence);
    this.absenceService.validerOuRejeterAbsence(absence).subscribe(result => {
      this.alertActive = true;
      this.alertClass = "alert-success";
      this.msg = "L'absence n°"+ result.id + " est rejetée";
      console.log('result ',result);
      
      // Mise à jour des absences suite à la soumission du formulaire
      this.absenceService.refreshAbsencesByMatricule();
      
    },err => {
      console.log(err);
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
