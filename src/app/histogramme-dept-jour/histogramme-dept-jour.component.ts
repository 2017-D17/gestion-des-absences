import { Component, OnInit } from "@angular/core";
import { Collaborateur } from "../shared/domain/collaborateur";

@Component({
  selector: "app-histogramme-dept-jour",
  templateUrl: "./histogramme-dept-jour.component.html",
  styleUrls: ["./histogramme-dept-jour.component.css"]
})
export class HistogrammeDeptJourComponent {
  single: any[];
  multi: any[];
  view: any[] = [800, 200];
  annees: number[] = [];
  mois: string[] = [];
  depts: string[] = [];

  annee: number;
  unmois: string;
  dept: string;
  //option
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = "";
  showYAxisLabel = true;
  yAxisLabel = "";
  colorScheme = {
    domain: [
      "#5AA454",
      "#A10A28",
      "#C7B42C",
      "#AAAAAA",
      "#803690",
      "#00ADF9",
      "#DCDCDC",
      "#46BFBD",
      "#FDB45C",
      "#949FB1",
      "#4D5360"
    ]
  };

  constructor() {
    var multi = [
      {
        name: "2015-06-18",
        series: [
          {
            name: "2010",
            value: 9
          },
          {
            name: "2011",
            value: 1
          }
        ]
      },
      {
        name: "2014-06-15",
        series: [
          {
            name: "2010",
            value: 4
          },
          {
            name: "201",
            value: 5
          }
        ]
      }
    ];
    Object.assign(this, { multi });
  }

  onSelect(event) {
    console.log(event);
  }

  makeDayRepresentation() {}

  filterChanges(annee) {
    this.annee = annee;
    /*if (event && event.srcElement) {
      this.annee = event.srcElement.value;
      this.dept = event.srcElement.value;
      this.mois = event.srcElement.value;
    }*/
  }

  handlefilterEventChanged(newAnnee: number, newmois: string, newDept: string) {
    return (
      (this.annee = newAnnee), (this.unmois = newmois), (this.dept = newDept)
    );
  }
}

class col {
  constructor(public name: string, public value: number) {}
}
