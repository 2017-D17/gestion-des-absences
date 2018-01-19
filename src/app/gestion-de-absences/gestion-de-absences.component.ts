import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-gestion-de-absences",
  templateUrl: "./gestion-de-absences.component.html",
  styleUrls: ["./gestion-de-absences.component.css"]
})
export class GestionDeAbsencesComponent implements OnInit {
  collaborateurs: Collaborateur[] = [];
  constructor() {}

  ngOnInit() {}
}
