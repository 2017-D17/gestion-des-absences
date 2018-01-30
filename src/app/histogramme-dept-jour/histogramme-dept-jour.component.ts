import { Component, OnInit, Input } from "@angular/core";
import { Collaborateur } from "../shared/domain/collaborateur";
import { Absence } from "../shared/domain/absence";
import { AbsenceService } from "../shared/service/absence.service";
import { ExcelService } from "../shared/service/excel.service";
import { LoginService } from "../shared/service/login.service";

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
  view: any[] = [1100, 300];
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
      "#ff99ff",
      "#00ADF9",
      "#DCDCDC",
      "#46BFBD",
      "#FDB45C",
      "#949FB1",
      "#4D5360",
      "#ff9999",
      "	#9999ff"
    ]
  };

  constructor(
    private loginService: LoginService,
    private absService: AbsenceService,
    private excelService: ExcelService
  ) {
    let dates = this.date;
    Object.assign(this, { dates });
  }

  onSelect(event) {
  }

  ngOnInit() {
    // récupération du collaborateur connecté
    this.collaborateur = this.loginService.getConnectedUser();

    let year = this.currentDatetime.getFullYear();
    let month = this.currentDatetime.getMonth();
    this.initialiserHistogramme(year, month, this.collaborateur.departement);
  }

  filterChanges(event) {
    this.currentDatetime = new Date();
    this.filtre = event;
    this.initialiserHistogramme(
      parseInt(this.filtre.annee),
      parseInt(this.filtre.mois),
      this.filtre.departement
    );
  }

  initialiserHistogramme(year: number, month: number, departement: string) {
    let series = [];
    this.collaborateurs = [];
    this.absService.listerAllAbsences();
    this.absService.allAbsencesSubj.subscribe(result => {
      this.absences = result;
      result.forEach(abs => {
        if (
          this.isCollabExist(abs.collaborateur) === false &&
          abs.collaborateur.departement === this.filtre.departement
        ) {
          this.collaborateurs.push(abs.collaborateur);
        }
      });
      this.date = [];
      let monthNum: number = month + 1;
      let d = new Date(year, monthNum, 0);
      for (let i = 1; i <= d.getDate(); i++) {
        series = [];
        let today: Date = new Date(year, month, i);
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
          let serie = {
            name: collab.nom,
            value: absenceList.length
          };
          series.push(serie);
        });
        let monthNum: number = today.getMonth() + 1;
        let formattedToday =
          today.getDate() + "/" + monthNum + "/" + today.getFullYear();
        let obj = {
          name: formattedToday,
          series: series
        };
        this.date.push(obj);
      }
    });
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

  filterByDeptAndYearAndMonth(absence) {
    if (
      absence.collaborateur.departement == this.filtre.departement &&
      this.filtre.annee == absence.dateDebut.substring(0, 4) &&
      this.filtre.annee == absence.dateFin.substring(0, 4) &&
      this.filtre.mois + 1 == absence.dateDebut.substring(5, 7) &&
      this.filtre.mois + 1 == absence.dateFin.substring(5, 7)
    ) {
      return true;
    } else {
      return false;
    }
  }

  exporterCSV() {
    let data = [];
    let exportData = this.absences
      .filter(absence => this.filterByDeptAndYearAndMonth(absence))
      .forEach(absence => {
        data.push({
          Nom: absence.collaborateur.nom,
          Prenom: absence.collaborateur.prenom,
          Date_de_debut: absence.dateDebut,
          Date_de_fin: absence.dateFin,
          Type_de_congés: absence.type,
          Durée_du_congés: this.getNbrJour(absence.dateDebut, absence.dateFin)
        });
      });
    this.excelService.exportAsExcelFile(data, "histogramme_conges");
  }

  getNbrJour(dateDebut: Date, dateFin: Date) {
    var date1 = new Date(dateDebut);
    var date2 = new Date(dateFin);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays + 1;
  }
}
