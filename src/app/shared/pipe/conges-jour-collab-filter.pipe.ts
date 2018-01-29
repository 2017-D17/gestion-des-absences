import { Pipe, PipeTransform } from '@angular/core';
import { Absence } from "../domain/absence";
import { AbsenceType } from "../domain/absence-type.enum";
import { JourFerie } from "../domain/jour-ferie";
import { FerieType } from '../domain/ferie-type.enum';

@Pipe({
  name: 'congesJourCollabFilter'
})
export class CongesJourCollabFilterPipe implements PipeTransform {

  transform(type: string, matricule:string, absences:Absence[], day:any, joursFeries:JourFerie[]): any {
    // Récupération des jours fériés
    let jfResult = joursFeries.filter(jf => {
      // récupérer date courante à tester
      let dayDate:any = this.getCurrentDateToTest(day);
      // récupérer les dates en nombre de milliseconde
      let dayDateNumber = this.convertDateToMillisecond(dayDate); // date à tester
      let dateJfNumber = this.convertDateToMillisecond(jf.date); // date de début de l'absence
      return dayDateNumber === dateJfNumber;
    });

    if(jfResult.length > 0) {
      type = jfResult[0].type;
    } else {
      // Récupération des absences
      let result = absences.filter(abs => {
        // récupérer date courante à tester
        let dayDate:any = this.getCurrentDateToTest(day);
        // récupérer les dates en nombre de milliseconde
        let dayDateNumber = this.convertDateToMillisecond(dayDate); // date à tester
        let dateDebutNumber = this.convertDateToMillisecond(abs.dateDebut); // date de début de l'absence
        let dateFinNumber = this.convertDateToMillisecond(abs.dateFin); // date de fin de l'absence
        return abs.collaborateur.matricule === matricule && dayDateNumber >= dateDebutNumber && dayDateNumber <= dateFinNumber;
      });
      if(result.length > 0) {
        type = result[0].type;
      } else {
        type = "";
      }
    }

    // récupération de la valeur du type
    switch(type) {
      case AbsenceType.CONGE_PAYE : type = "C";
      break;
      case AbsenceType.CONGE_SANS_SOLDE : type = "S";
      break;
      case AbsenceType.RTT : type = "R";
      break;
      case FerieType.RTT_EMPLOYEUR : type = "R";
      break;
      case FerieType.JOUR_FERIE : type = "F";
      break;
    }
    return type;
  }

  convertDateToMillisecond(stringDate):number {
    let dateNumber = 0;
    let date:any = new Date(stringDate);
    date.setHours(0,0,0,0);
    return Date.parse(date);
  }

    getCurrentDateToTest(day):any {
      // récupérer date courante à tester
      let dayNumber:number = parseInt(day.day);
      let dayMonth = day.month;
      let dayYear = day.year;
      return new Date(dayYear,dayMonth,dayNumber);
    }


}