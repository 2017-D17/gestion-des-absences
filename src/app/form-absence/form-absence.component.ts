import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AbsenceService } from '../shared/service/absence.service';
import { Absence } from '../shared/domain/absence';
import { Collaborateur } from '../shared/domain/collaborateur';
import { AbsenceType } from '../shared/domain/absence-type.enum';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';

@Component({
  selector: 'app-form-absence',
  templateUrl: './form-absence.component.html',
  styleUrls: ['./form-absence.component.css']
})
export class FormAbsenceComponent implements OnInit {
  titre: string = "Demande d'absence"
  collaborateur:Collaborateur = new Collaborateur("UUID3","annabelle","melissa")
  absence:Absence = new Absence(0,"","","","","",this.collaborateur);
  msg:string;
	succesAjout:boolean= false;
	alertActive:boolean= false;
  alertClass:string;
  typeOptions : string[];
  myType: AbsenceType;
  AgentStatus : typeof AbsenceType = AbsenceType;
  isValid: boolean = false;

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
    // Récupération dans un tableau de string des types d'absence à partir de l'énumération
    let x = AbsenceType;
    let options = Object.keys(AbsenceType);
    this.typeOptions = options.slice(options.length / 2);

    // Desactivation des dates precedente à la date actuelle
    this.currentDate = new Date();
    this.myDatePickerOptions.disableUntil = {year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() +1, day: this.currentDate.getDate()};
  }
 
  parseValue(value : string) {
    this.myType = AbsenceType[value];
  }

  submit() {
    this.absence.dateDebut = this.dateDebut.formatted;
    this.absence.dateFin = this.dateDeFin.formatted;
    console.log(this.absence);

    
    // this.absenceService.sauvegarder(this.absence).subscribe(result => {
    //   console.log('result ',result);			
		// 	if(result.succes == "true") {
		// 	// 	let absence:Absence = new Absence(result.entite.id,result.entite.collegue,result.entite.commentaire);
    //   //   this.collegueService.refreshCommentaires();
    //   //   if ( this.dialog ) {
    //   //     this.dialog.dismiss();
    //   //     this.dialog = null;
    //   //  }
		// 	} else {
    //     // this.alertClass = "alert-danger";
    //     // this.msg = result.message;
		// 	  // this.alertActive = true;
		// 	}
			
		// });
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
      } else if (this.absence.type != 'Congé sans solde') {
        this.isValid = true;
      }
    }
    console.log('after change', this.isValid);
  }

}
