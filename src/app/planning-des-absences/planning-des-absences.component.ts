import { Component, ChangeDetectionStrategy, ViewEncapsulation, OnInit } from '@angular/core';
import {
  CalendarEvent,
  CalendarDateFormatter,
  DAYS_OF_WEEK
} from 'angular-calendar';
import { DateFormatterServiceService } from "../calendar/service/date-formatter-service.service";
import { Absence } from "../shared/domain/absence";
import { AbsenceService } from "../shared/service/absence.service";
import { JoursFeriesService } from "../shared/service/jours-feries.service";
import { AbsenceType, ABSENCES_TYPES} from "../shared/domain/absence-type.enum";
import { FerieType, FERIE_TYPES } from "../shared/domain/ferie-type.enum";
import { JourFerie } from "../shared/domain/jour-ferie";
import { LoginService } from "../shared/service/login.service";
import { Collaborateur } from "../shared/domain/collaborateur";


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-planning-des-absences',
  templateUrl: './planning-des-absences.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./planning-des-absences.component.css',]
})
export class PlanningDesAbsencesComponent implements OnInit {
  // Collaborateur connecté
  collaborateur: Collaborateur;
  absences: Absence[] = [];
  joursFeries: JourFerie[] = [];
  rtt:number;
  conges:number;
  absenceClass:string;

  constructor(private absService: AbsenceService,private jourFerieService: JoursFeriesService,private loginService: LoginService) { }

  ngOnInit() {
    //récupération du collaborateur connecté
    this.collaborateur = this.loginService.getConnectedUser();
    this.rtt = this.collaborateur.conges;
    this.conges = this.collaborateur.rtt;
    this.absService.absenceSubj.subscribe(result => {
      this.absences = result;
      result.forEach(a => {
        this.absenceClass = "absence-color";
        let event:any = {};
        if(a.type != 'RTT_EMPLOYEUR') {
          let label:string = ABSENCES_TYPES.filter( abs => abs.key == a.type)[0].label;
          event = {
            title:label,
            type: a.type,
            start: new Date(a.dateDebut),
            end: new Date(a.dateFin),
          }
        }
        this.events.push(event)
      });
      console.log(this.events);
    });

    this.jourFerieService.ferieSubj.subscribe(jourF => {
      this.joursFeries = jourF;
      jourF.forEach(jf => {
        let label:string = FERIE_TYPES.filter( abs => abs.key == jf.type)[0].label;
        let event:any = {
          title: label,
          type: jf.type,
          start: new Date(jf.date)
        }
          
        this.events.push(event)
      });
    });
  }

  view: string = 'month';

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  locale: string = 'fr';

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.SUNDAY, DAYS_OF_WEEK.SATURDAY];

}