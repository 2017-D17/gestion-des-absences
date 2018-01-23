import { Component, OnInit, Input } from "@angular/core";
import { JoursFeriesService } from "../shared/service/jours-feries.service";
import { JourFerie } from "../shared/domain/jour-ferie";
import {} from "@angular/core";

@Component({
  selector: "app-jours-feries",
  templateUrl: "./jours-feries.component.html",
  styleUrls: ["./jours-feries.component.css"]
})
export class JoursFeriesComponent implements OnInit {
  @Input() JourFerie: JourFerie;
  joursFeries: JourFerie[] = [];
  annees: number[] = [];

  constructor(private jourFerieService: JoursFeriesService) {}

  ngOnInit() {
    // let jFerie: JourFerie = new JourFerie(
    //   0,
    //   new Date("2018-08-14"),
    //   "RTT employeur",
    //   ""
    // );
    // let jFerie1: JourFerie = new JourFerie(
    //   0,
    //   new Date("2017-08-14"),
    //   "Férié",
    //   "Lundi de paques"
    // );

    let date = new Date();
    console.log(date.getFullYear());
    console.log(date);

    this.jourFerieService.ferieSubj.subscribe(jourF => {
      this.joursFeries = jourF;
      // this.joursFeries.push(jFerie);
      // this.joursFeries.push(jFerie1);
      //filtre les annee
      this.joursFeries.forEach(jf => {
        var annee = jf.date.slice(0, 4);
        console.log(
          "===> annee:" + typeof annee + ", jf.date:" + typeof jf.date
        );
        if (!this.annees.includes(annee)) {
          this.annees.push(annee);
        }
      });
    });
  }
}
