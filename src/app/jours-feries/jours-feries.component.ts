import { Component, OnInit, Input } from "@angular/core";
import { AbsenceService } from "../shared/service/absence.service";
import { JourFerie } from "../shared/domain/jour-ferie";
import { JoursFeriesService } from "../shared/service/jours-feries.service";
import { FerieType, FERIE_TYPES } from "../shared/domain/ferie-type.enum";

@Component({
  selector: "app-jours-feries",
  templateUrl: "./jours-feries.component.html",
  styleUrls: ["./jours-feries.component.css"]
})
export class JoursFeriesComponent implements OnInit {
  @Input() JourFerie: JourFerie;
  demandeAbsence: string = "add";
  modifAbsence: string = "update";
  joursFeries: JourFerie[] = [];
  annees: number[] = [];
  // Type de jours férié
  jfTypes: any = FERIE_TYPES;

  constructor(private jourFerieService: JoursFeriesService) {}

  ngOnInit() {
    this.jourFerieService.ferieSubj.subscribe(jourF => {
      this.joursFeries = jourF;
      //filtre les annee
      this.joursFeries.forEach(jf => {
        let annee = jf.date.slice(0, 4);
        if (!this.annees.includes(annee)) {
          this.annees.push(annee);
        }
      });
    });
  }

  filtrerParDate(event) {
    let annee = event.srcElement.value;
    console.log('filter date', annee);
    this.joursFeries.filter( jf => jf.date.slice(0, 4) === annee);
  }
}
