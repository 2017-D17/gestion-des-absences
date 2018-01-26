import { Component, OnInit } from "@angular/core";
import { Collaborateur } from "../shared/domain/collaborateur";

@Component({
  selector: "app-histogramme-dept-jour",
  templateUrl: "./histogramme-dept-jour.component.html",
  styleUrls: ["./histogramme-dept-jour.component.css"]
})
export class HistogrammeDeptJourComponent {
  collaborateurs: Collaborateur[] = [];
  single: any[];
  multi: any[];
  view: any[] = [800, 200];
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

    var single = [
      {
        name: "2014-06-18",
        value: 0
      },
      {
        name: "2017-06-18",
        value: 5
      },
      {
        name: "2017-06-18",
        value: 12
      }
    ];

    var multi = [
      {
        name: "2014-06-18",
        series: [new col("amelie", 8), new col("X", 3)]
      },
      {
        name: "2017-06-18",
        series: [new col("martin2", 7)]
      },

      {
        name: "2018-06-20",
        series: [new col("2010", 5), new col("Y", 2)]
      }
    ];
    Object.assign(this, { single, multi });
  }

  onSelect(event) {
    console.log(event);
  }

  makeDayRepresentation() {}
  afficherJour()
  {
    if()
  }
}

class col {
  constructor(public name: string, public value: number) {}
}

