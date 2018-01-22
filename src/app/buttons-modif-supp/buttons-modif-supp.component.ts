import { Component, Input, OnInit } from "@angular/core";
import { Absence } from "../shared/domain/absence";

@Component({
  selector: "app-buttons-modif-supp",
  templateUrl: "./buttons-modif-supp.component.html",
  styleUrls: ["./buttons-modif-supp.component.css"]
})
export class ButtonsModifSuppComponent implements OnInit {
  @Input() absence: Absence;

  absences: Absence[];
  modif: boolean = false;
  constructor() {}

  ngOnInit() {
    if (this.absence.statut == "INITIALE") {
      this.modif = true;
    }
  }

  supprimer() {
    console.log("supprimer");
  }

  modifier() {
    console.log(this.absence);
    console.log("modifier");
  }
}
