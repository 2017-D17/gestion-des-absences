import { Component, Input } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { JourFerie } from "../shared/domain/jour-ferie";
import { JoursFeriesService } from "../shared/service/jours-feries.service";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap/modal/modal-ref";

@Component({
  selector: "app-suprimer-jour-ferie",
  templateUrl: "./suprimer-jour-ferie.component.html",
  styleUrls: ["./suprimer-jour-ferie.component.css"]
})
export class SuprimerJourFerieComponent {
  closeResult: string;
  msg: string;
  // Message d'erreur ou de succès suite à l'envoi des données sur le serveur
  msgServeur: string;
  // Attribut permettant d'afficher ou non le message d'alert msg
  alertActive: boolean = false;

  dialog: NgbModalRef | null;
  @Input() jourFerie: JourFerie;
  constructor(
    private modalService: NgbModal,
    private jourFerieService: JoursFeriesService
  ) {}

  open(content) {
    this.dialog = this.modalService.open(content);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  ngOnInit() {
    this.msg =
      " c'est interdit de supprimer un jour ferie ou une RTT dans le passé";
  }

  supprimerUnJourFerie(jourFerie: JourFerie) {
    this.jourFerieService.supprimerJourFerie(jourFerie.id).subscribe(
      resultat => {
        jourFerie = resultat;

        if (this.dialog) {
          this.dialog.dismiss();
          this.dialog = null;
        }
        this.jourFerieService.refreshJoursFeries();
      },
      err => {
        console.log(err);
        this.alertActive = true;
        if (err && err.error) {
          this.msgServeur = err.error.message;
        } else {
          this.msgServeur = "Votre jour férié ou RTT n'a pas pu être supprimé.";
        }
      }
    );
  }

  // Fermeture de l'alert par la croix
  closeAlert() {
    this.alertActive = false;
  }
}
