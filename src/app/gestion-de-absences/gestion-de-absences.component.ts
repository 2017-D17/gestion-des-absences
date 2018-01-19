import { Component, OnInit } from "@angular/core";
import { Absence } from "../shared/domain/absence";
import { AbsenceService } from "../shared/service/absence.service";

@Component({
  selector: "app-gestion-de-absences",
  templateUrl: "./gestion-de-absences.component.html",
  styleUrls: ["./gestion-de-absences.component.css"]
})
export class GestionDeAbsencesComponent implements OnInit {
  absences: Absence[] = [];
  constructor(private absService: AbsenceService) {}

  ngOnInit() {
    this.absService.absenceSubj.subscribe(result => {
      this.absences = result;
    });
  }
}
