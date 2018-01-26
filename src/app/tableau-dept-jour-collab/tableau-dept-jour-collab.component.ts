import { Component, OnInit } from '@angular/core';
import { Absence } from "../shared/domain/absence";
import { Collaborateur } from "../shared/domain/collaborateur";
import { LoginService } from "../shared/service/login.service";
import { JoursFeriesService } from "../shared/service/jours-feries.service";
import { AbsenceService } from "../shared/service/absence.service";
import { JourFerie } from "../shared/domain/jour-ferie";

@Component({
  selector: 'app-tableau-dept-jour-collab',
  templateUrl: './tableau-dept-jour-collab.component.html',
  styleUrls: ['./tableau-dept-jour-collab.component.css']
})
export class TableauDeptJourCollabComponent implements OnInit {
  absences: Absence[] = [];
  // Collaborateur connecté
  collaborateur: Collaborateur;
  // tableau des jours pour le mois selectionné
  days:any[]=[];
  // tableau des jours fériés
  joursFeries: JourFerie[] = [];
  

  constructor(private loginService: LoginService,private jourFerieService: JoursFeriesService,private absService: AbsenceService) { }

  ngOnInit() {
    // Initialisation du tableau
    let year:number = 2018;
    let month:number = 1;
    let d = new Date(year, month, 0);
    for(let i=1;i<=d.getDate();i++) {
      let weekendClass:string ="";
      let today:Date = new Date(year,month,i);
      if(today.getDay() == 6 || today.getDay() == 0) {
        weekendClass = "weekendClass";
      }
      let dateObject = {};
      if(i<10) {
        dateObject = {
          day: "0"+i,
          month: month,
          year: year,
          cssClass: weekendClass
        }
        
      }else {
        dateObject = {
          day: i,
          month: month,
          year: year,
          cssClass: weekendClass
        }
      }
      
      this.days.push(dateObject);
    }
    
    console.log('last day of january:', d.getDate() )
    // récupération du collaborateur connecté
    this.loginService.subjectCollaborateur.subscribe(
      data => (this.collaborateur = data)
    );

    // récupération de toutes les absences
    this.absService.allAbsencesSubj.subscribe(result => {
      this.absences = result;
    });

    //récupération de la liste des collaborateurs

    // récupération des jours fériés
    this.jourFerieService.ferieSubj.subscribe(jourF => {
      this.joursFeries = jourF;
      jourF.forEach(jf => {
        let event:any = {
          title: "",
          type: jf.type,
          start: new Date(jf.date)
        }
          
        // this.events.push(event)
      });
    });
  }

}
