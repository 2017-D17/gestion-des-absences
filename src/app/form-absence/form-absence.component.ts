import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AbsenceService } from '../shared/service/absence.service';
import { Absence } from '../shared/domain/absence';
import { AbsenceType } from '../shared/domain/absence-type.enum';
import * as $ from 'jquery';

@Component({
  selector: 'app-form-absence',
  templateUrl: './form-absence.component.html',
  styleUrls: ['./form-absence.component.css']
})
export class FormAbsenceComponent implements OnInit {
  titre: string = "Demande d'absence"
  absence:Absence = new Absence(0,"","","","","");
  msg:string;
	succesAjout:boolean= false;
	alertActive:boolean= false;
  alertClass:string;
  typeOptions : string[];
  myType: AbsenceType;
  AgentStatus : typeof AbsenceType = AbsenceType;

  constructor(private absenceService:AbsenceService) { }

  ngOnInit() {
    let x = AbsenceType;
    let options = Object.keys(AbsenceType);
    this.typeOptions = options.slice(options.length / 2);
  }

  parseValue(value : string) {
    this.myType = AbsenceType[value];
  }

  submit() {
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

}
