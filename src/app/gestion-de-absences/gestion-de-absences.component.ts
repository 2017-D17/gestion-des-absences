import { Component, OnInit } from "@angular/core";
import { Absence } from "../shared/domain/absence";

@Component({
  selector: "app-gestion-de-absences",
  templateUrl: "./gestion-de-absences.component.html",
  styleUrls: ["./gestion-de-absences.component.css"]
})
export class GestionDeAbsencesComponent implements OnInit {
  absence: Absence[] = [];
  constructor() { }

  ngOnInit() { }
}
