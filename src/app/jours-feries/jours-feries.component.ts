import { Component, OnInit } from '@angular/core';
import { AbsenceService } from "../shared/service/absence.service";
import { JourFerie } from '../shared/domain/jour-ferie';
import { JoursFeriesService } from "../shared/service/jours-feries.service";
import { FerieType, FERIE_TYPES } from '../shared/domain/ferie-type.enum';


@Component({
  selector: "app-jours-feries",
  templateUrl: "./jours-feries.component.html",
  styleUrls: ["./jours-feries.component.css"]
})
export class JoursFeriesComponent implements OnInit {
  demandeAbsence: string = "add";
  modifAbsence: string = "update";
  joursFeries: JourFerie[] = [];
  annees: number[] = [];
   // Type de jours férié
   options:any = FERIE_TYPES;

  constructor(private jourFerieService: JoursFeriesService) {}

  ngOnInit() {
    this.jourFerieService.ferieSubj.subscribe(jourF => {
      this.joursFeries = jourF;
      //filtre les annee
      this.joursFeries.forEach(jf => {
        console.log(jf.date);
        // let annee = jf.date.getFullYear();
        let date:Date = new Date(jf.date);
        let annee = date.getFullYear();
        if (!this.annees.includes(annee)) {
          this.annees.push(annee);
        }
      });
    });
  }
}
