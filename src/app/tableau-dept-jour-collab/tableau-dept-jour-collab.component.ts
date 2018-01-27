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
  // tableau des collaborateurs
  collaborateurs: Collaborateur[] = [];
  // tableau des jours pour le mois selectionné
  days:any[]=[];
  // tableau des jours fériés
  joursFeries: JourFerie[] = [];
  

  constructor(private loginService: LoginService,private jourFerieService: JoursFeriesService,private absService: AbsenceService) { }

  ngOnInit() {
    // Initialisation du tableau
    let year:number = 2018;
    let month:number = 0; // Janvier
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

    // récupération de toutes les absences et de la liste des collaborateurs
    this.absService.listerAllAbsences();
    this.absService.allAbsencesSubj.subscribe(result => {
      this.absences = result;
      result.forEach(abs => {
        if(this.isCollabExist(abs.collaborateur) === false) {
          this.collaborateurs.push(abs.collaborateur);
        }
      });
    });

    // récupération des jours fériés
    this.jourFerieService.ferieSubj.subscribe(jourF => {
      this.joursFeries = jourF;
    });
  }

  isCollabExist(collab:Collaborateur):boolean {
    let nbCollab = 0;
    this.collaborateurs.forEach(col => {
      if(col.matricule === collab.matricule) {
        nbCollab++;
      }
    });
    if(nbCollab > 0) {
      return true;
    } else {
      return false;
    }
  }

}
