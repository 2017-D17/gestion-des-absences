import { Component, OnInit, Output,Input,EventEmitter} from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { Absence } from '../shared/domain/absence';
import { AbsenceService } from "../shared/service/absence.service";
import { Collaborateur } from "../shared/domain/collaborateur";
import { LoginService } from "../shared/service/login.service";

@Component({
  selector: 'app-filtre-dept-mois-annee',
  templateUrl: './filtre-dept-mois-annee.component.html',
  styleUrls: ['./filtre-dept-mois-annee.component.css']
})
export class FiltreDeptMoisAnneeComponent implements OnInit {
  // Collaborateur connecté
  collaborateur: Collaborateur;
  @Input() absences:Absence[];
  // Objet qui contient les filtres departement, mois et année
  filtre:any = {};
  // tableau des années présentess dans le filtre (de l'année précédent jusqu'à 5 ans après l'année courante)
  annees:number[] = [];
  // tableau des mois d'une année
  moisDeLannee:any[] = [];
  // tableau des départements
  depts:string[] = [];
  @Output() changedFilter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private loginService: LoginService,private absService: AbsenceService) { }

  ngOnInit() {
    // récupération du collaborateur connecté
    this.collaborateur = this.loginService.getConnectedUser();

    let currentDate = new Date();
    // Initialisation des années à partir de l'année actuelle
    this.filtre.annee = currentDate.getFullYear();
    for(let i=currentDate.getFullYear()-1; i< currentDate.getFullYear()+5;i++) {
      this.annees.push(i);
    }

    // Initialisation des mois de l'année
    let monthObj:any = this.getMonthObject(currentDate.getMonth());
    this.filtre.mois = monthObj.number;
    for(let i=0;i<12;i++) {
      let month = this.getMonthObject(i);
      this.moisDeLannee.push(month);
    }

    // Initialisation des départements
    this.filtre.departement = this.collaborateur.departement;
    if(this.isDepartementExist(this.collaborateur.departement) === false) {
      this.depts.push(this.collaborateur.departement);
    }
    this.absService.listerAllAbsences();
    this.absService.allAbsencesSubj.subscribe(result => {
      this.absences = result;
      result.forEach(abs => {
        if(this.isDepartementExist(abs.collaborateur.departement) === false) {
          this.depts.push(abs.collaborateur.departement);
        }
      });
    });
    this.changedFilter.emit(this.filtre);

  }

  submit() {
    this.changedFilter.emit(this.filtre);

  }

  isDepartementExist(departement:string):boolean {
    let nbDept = 0;
    this.depts.forEach(d => {
      if(d === departement) {
        nbDept++;
      }
    });
    if(nbDept > 0) {
      return true;
    } else {
      return false;
    }
  }

  getMonthObject(number:number) {
    let month = {};
    switch(number) {
      case 0: month = {
        name: "Janvier",
        number: 0
      };
      break;
      case 1: month = {
        name: "Février",
        number: 1
      };
      break;
      case 2: month = {
        name: "Mars",
        number: 2
      };
      break;
      case 3: month = {
        name: "Avril",
        number: 3
      };
      break;
      case 4: month = {
        name: "Mai",
        number: 4
      };
      break;
      case 5: month = {
        name: "Juin",
        number: 5
      };
      break;
      case 6: month = {
        name: "Juillet",
        number: 6
      };
      break;
      case 7: month = {
        name: "Août",
        number: 7
      };
      break;
      case 8: month = {
        name: "Septembre",
        number: 8
      };
      break;
      case 9: month = {
        name: "Octobre",
        number: 9
      };
      break;
      case 10: month = {
        name: "Novembre",
        number: 10
      };
      break;
      case 11: month = {
        name: "Décembre",
        number: 11
      };
      break;
    }
    return month;
  }

}
