import { Component, OnInit } from "@angular/core";
import { Absence } from "../shared/domain/absence";

@Component({
  selector: "app-buttons-modif-supp",
  templateUrl: "./buttons-modif-supp.component.html",
  styleUrls: ["./buttons-modif-supp.component.css"]
})
export class ButtonsModifSuppComponent implements OnInit {
  absence: Absence;

  constructor() {}

  ngOnInit() {}

  supprimer(absence: Absence) {
    console.log("supprimer");
  }

  modifier(absence: Absence) {
    // console.log("modifier");
    // if (absence.statut == "INITIAL") {
    //   return absence;
    // }
  }
}
