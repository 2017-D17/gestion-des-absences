import { Component, OnInit } from "@angular/core";
import { AbsenceService } from "../shared/service/absence.service";
import { Absence } from "../shared/domain/absence";
import { Collaborateur } from "../shared/domain/collaborateur";

@Component({
  selector: "app-gestion-des-absences",
  templateUrl: "./gestion-des-absences.component.html",
  styleUrls: ["./gestion-des-absences.component.css"]
})
export class GestionDesAbsencesComponent implements OnInit {
  absences: Absence[] = [];
  demandeAbsence:string = "add";

  constructor(private absService: AbsenceService) {}

  ngOnInit() {
    // let collab:Collaborateur = new Collaborateur("bd540e65","Rossi","Roberts");
    // let abs:Absence = new Absence(0,"2018-01-24","2018-01-25","CONGE_PAYE","","INITIALE",collab);
    this.absService.absenceSubj.subscribe(result => {
      this.absences = result;
      // this.absences.push(abs);
    });
  }
}
