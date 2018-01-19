import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AbsenceService } from '../shared/service/absence.service';
import { Absence } from '../shared/domain/absence';
import { Collaborateur } from '../shared/domain/collaborateur';
import { AbsenceType, ABSENCES_TYPES } from '../shared/domain/absence-type.enum';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import { AbsenceStatut, ABSENCES_STATUS } from '../absence-statut.enum';

@Component({
  selector: 'app-form-absence',
  templateUrl: './form-absence.component.html',
  styleUrls: ['./form-absence.component.css']
})
export class FormAbsenceComponent implements OnInit {
  titre: string = "Demande d'absence"
  collaborateur:Collaborateur = new Collaborateur("bd540e65","Rossi","Roberts");
  absence:Absence = new Absence(0,"","","","","",this.collaborateur);
  msg:string;
	succesAjout:boolean= false;
	alertActive:boolean= false;
  alertClass:string;
  isValid: boolean = false;
  options:any = ABSENCES_TYPES;

  // Options du DatePicker
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    dayLabels: {su: 'Dim', mo: 'Lun', tu: 'Mar',we: 'Mer', th: 'Je', fr: 'Ven', sa: 'Sam'},
    monthLabels : { 1: 'Jan', 2: 'Fev', 3: 'Mar', 4: 'Avr', 5: 'Mai', 6: 'Jui', 7: 'Jui', 8: 'Aoû', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' },
    todayBtnTxt : "Aujourd'hui",
    firstDayOfWeek: "mo",
    satHighlight: true
  };
  // Objet qui récupère la date de début saisie
  dateDebut:any;
  // Objet qui récupère la date de fin saisie
  dateDeFin:any;
  // Objet Date qui stock la date actuelle
  currentDate:Date;

  constructor(private absenceService:AbsenceService) { }

  ngOnInit() {

    // Desactivation des dates precedente à la date actuelle
    this.currentDate = new Date();
    this.myDatePickerOptions.disableUntil = {year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() +1, day: this.currentDate.getDate()};
  }

  submit() {
    this.isValid = true;
    let dayDebut = "";
    let monthDebut = "";
    if(this.dateDebut.date.day < 10) {
      dayDebut = "0" + this.dateDebut.date.day;
    } else {
      dayDebut = this.dateDebut.date.day;
    }
    if(this.dateDebut.date.month < 10) {
      monthDebut = "0" + this.dateDebut.date.month;
    }else {
      monthDebut = this.dateDebut.date.month;
    }

    let dayFin = "";
    let monthFin = "";
    if(this.dateDeFin.date.day < 10) {
      dayFin = "0" + this.dateDeFin.date.day;
    } else {
      dayFin = this.dateDeFin.date.day;
    }
    if(this.dateDeFin.date.month < 10) {
      monthFin = "0" + this.dateDeFin.date.month;
    } else {
      monthFin = this.dateDeFin.date.month;
    }
    this.absence.dateDebut = this.dateDebut.date.year + "-" + monthDebut + "-"  + dayDebut ;
    this.absence.dateFin = this.dateDeFin.date.year + "-" + monthFin + "-"  + dayFin ;
    this.absence.statut = AbsenceStatut.INITIALE;
    console.log(this.absence);
    
    this.absenceService.sauvegarderAbsence(this.absence).subscribe(result => {
      console.log('result ',result);
      if(result != null) {
        this.succesAjout = true;
        this.msg = "Votre demande a été ajouté. Dès demain, elle sera en attente de validation par votre manager.";
        // if ( this.dialog ) {
      //     this.dialog.dismiss();
      //     this.dialog = null;
      //  }
      }		else {
        this.msg = "Votre demande n'a pas pu être ajouté."
      }	
			
		});
  }

  // Ecouteur sur la de début
  onDateDebutChanged(event: IMyDateModel) {
    console.log('onDateChanged(): ', event.formatted);
    this.absence.dateDebut = event.epoc;
    this.onAlertChanged(event);
  }

  // Ecouteur sur la de fin
  onDateFinChanged(event: IMyDateModel) {
    console.log('onDateChanged(): ', event.formatted);
    this.absence.dateFin= event.epoc;
    this.onAlertChanged(event);
  }

  onAlertChanged(event: any) {
    this.isValid = false;
    if(this.absence.dateDebut <= this.absence.dateFin ) {
      if(this.absence.type === 'Congé sans solde' && this.absence.motif != "") {
        this.isValid = true;
      } else if (this.absence.type != 'Congé sans solde' && this.absence.type != "") {
        this.isValid = true;
      }
    }
    console.log('after change', this.isValid);
  }

}
