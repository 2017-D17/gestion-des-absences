import { Component, OnInit } from "@angular/core";
import { AbsenceService } from "../shared/service/absence.service";
import { Absence } from "../shared/domain/absence";

@Component({
  selector: "app-gestion-des-absences",
  templateUrl: "./gestion-des-absences.component.html",
  styleUrls: ["./gestion-des-absences.component.css"]
})
export class GestionDesAbsencesComponent implements OnInit {
  absences: Absence[] = [];

  constructor(private absService: AbsenceService) {}

  ngOnInit() {
    this.absService.absenceSubj.subscribe(result => {
      this.absences = result;
    });
  }
}
