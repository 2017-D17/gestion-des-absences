import { Component, OnInit, Input } from "@angular/core";
import { AbsenceService } from "../shared/service/absence.service";
import { JourFerie } from "../shared/domain/jour-ferie";
import { JoursFeriesService } from "../shared/service/jours-feries.service";
import { FerieType, FERIE_TYPES } from "../shared/domain/ferie-type.enum";
import { LoginService } from "../shared/service/login.service";
import { Collaborateur } from "../shared/domain/collaborateur";

@Component({
  selector: "app-jours-feries",
  templateUrl: "./jours-feries.component.html",
  styleUrls: ["./jours-feries.component.css"]
})
export class JoursFeriesComponent implements OnInit {
  // Collaborateur connecté
  collaborateur: Collaborateur;
  @Input() JourFerie: JourFerie;
  demandeAbsence: string = "add";
  modifAbsence: string = "update";
  joursFeries: JourFerie[] = [];
  annees: number[] = [];
  // Type de jours férié
  jfTypes: any = FERIE_TYPES;
  annee:number;

  constructor(private jourFerieService: JoursFeriesService,private loginService: LoginService) {}

  ngOnInit() {
     // récupération du collaborateur connecté
     this.loginService.subjectCollaborateur.subscribe(
      data => (this.collaborateur = data)
    );

    this.jourFerieService.ferieSubj.subscribe(jourF => {
      this.joursFeries = jourF;
      //filtre les annee
      this.joursFeries.forEach(jf => {
        let annee = jf.date.slice(0, 4);
        if (!this.annees.includes(annee)) {
          this.annees.push(annee);
        }
      });
      this.handleYearEventChanged(this.annees[0]);
    });
    this.jourFerieService.ferieSubj.next(this.joursFeries);
  }

  yearChanges(event) {
    if(event && event.srcElement) {
      this.annee = event.srcElement.value;
    }
  }

  handleYearEventChanged(newAnnee:number){
    return this.annee = newAnnee;
  }
}
