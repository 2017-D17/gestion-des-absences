import { Component, OnInit, Input } from "@angular/core";
import { Collaborateur } from "../shared/domain/collaborateur";
import { Absence } from "../shared/domain/absence";
import { AbsenceService } from "../shared/service/absence.service";
@Component({
  selector: "app-histogramme-dept-jour",
  templateUrl: "./histogramme-dept-jour.component.html",
  styleUrls: ["./histogramme-dept-jour.component.css"]
})
export class HistogrammeDeptJourComponent {
  // Collaborateur connecté
  collaborateur: Collaborateur;
  // tableau des collaborateurs
  @Input() collaborateurs: Collaborateur[] = [];
  date: any[] = [];
  @Input() filtre: any = {};
  currentDatetime: Date = new Date();
  colonnes: any[] = [];
  single: any[];
  multi: any[];
  view: any[] = [1100, 200];
  annees: number[] = [];
  mois: string[] = [];
  depts: string[] = [];
  absences: Absence[] = [];
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

  constructor(private absService: AbsenceService) {
    // let dates = this.date;
    var multi = [
      {
        name: "2015-06-18",
        series: [new collab("Jean", 9), new collab("Edrine", 2)]
      },
      {
        name: "2014-06-15",
        series: [new collab("Adrien", 11)]
      }
    ];
    // Object.assign(this, { multi });
    let dates = this.date;
    Object.assign(this, { dates });
  }

  onSelect(event) {
    console.log(event);
  }

  makeDayRepresentation() {}

  handlefilterEventChanged(newAnnee: number, newmois: string, newDept: string) {
    return (
      (this.annee = newAnnee), (this.unmois = newmois), (this.dept = newDept)
    );
  }
  ngOnInit() {
    let year = this.currentDatetime.getFullYear();
    let month = this.currentDatetime.getMonth();
    this.initialiserHistogramme(year, month);
  }
  filterChanges(event) {
    this.currentDatetime = new Date();
    console.log("event", event);
    this.filtre = event;
    console.log("filtre", this.filtre);
    this.initialiserHistogramme(
      parseInt(this.filtre.annee),
      parseInt(this.filtre.mois)
    );
  }
  initialiserHistogramme(year: number, month: number) {
    this.recuperationCollab(year, month);
  }
  recuperationCollab(year: number, month: number) {
    let series = [];
    this.absService.listerAllAbsences();
    this.absService.allAbsencesSubj.subscribe(result => {
      this.absences = result;
      result.forEach(abs => {
        if (this.isCollabExist(abs.collaborateur) === false) {
          this.collaborateurs.push(abs.collaborateur);
        }
      });
      this.date = [];
      let monthNum: number = month + 1;
      console.log("month 2", monthNum);
      let d = new Date(year, monthNum, 0);
      for (let i = 1; i <= d.getDate(); i++) {
        series = [];
        let today: Date = new Date(year, month, i);
        console.log("today", today.getMonth());
        this.collaborateurs.forEach(collab => {
          let DateNumber = this.convertDateToMillisecond(today); // date à tester

          let absenceList: Absence[] = this.absences.filter(a => {
            let dateDebNumber = this.convertDateToMillisecond(a.dateDebut);
            let dateFinNumber = this.convertDateToMillisecond(a.dateFin);

            return (
              a.collaborateur.matricule == collab.matricule &&
              DateNumber >= dateDebNumber &&
              DateNumber <= dateFinNumber
            );
          });
          console.log("absences", absenceList);
          let serie = {
            name: collab.nom,
            value: absenceList.length
          };
          series.push(serie);
        });
        console.log("serie", series);
        let monthNum: number = today.getMonth() + 1;
        let formattedToday =
          today.getDate() + "/" + monthNum + "/" + today.getFullYear();
        let obj = {
          name: formattedToday,
          series: series
        };
        console.log("obj", obj);
        this.date.push(obj);
      }
      console.log("date", this.date);
    });

    // return series;
  }

  isCollabExist(collab: Collaborateur): boolean {
    let nbCollab = 0;
    this.collaborateurs.forEach(col => {
      if (col.matricule === collab.matricule) {
        nbCollab++;
      }
    });
    if (nbCollab > 0) {
      return true;
    } else {
      return false;
    }
  }
  convertDateToMillisecond(stringDate): number {
    let dateNumber = 0;
    let date: any = new Date(stringDate);
    date.setHours(0, 0, 0, 0);
    return Date.parse(date);
  }
}

class collab {
  constructor(public name: string, public value: number) {}
}
