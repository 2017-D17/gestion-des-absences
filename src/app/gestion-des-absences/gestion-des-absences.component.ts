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
  demandeAbsence: string = "add";

  constructor(private absService: AbsenceService) {}

  ngOnInit() {
    this.absService.absenceSubj.subscribe(result => {
      console.log(result);
      this.absences = result;
    });
  }
}
