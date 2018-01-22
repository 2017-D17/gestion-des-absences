import { Component, OnInit } from "@angular/core";
import { Absence } from "../shared/domain/absence";

@Component({
  selector: "app-validation-demandes",
  templateUrl: "./validation-demandes.component.html",
  styleUrls: ["./validation-demandes.component.css"]
})
export class ValidationDemandesComponent implements OnInit {
  absences: Absence[] = [];
  constructor() {}

  ngOnInit() {}
}
