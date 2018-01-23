import { Component, Input,OnInit,ViewChild } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { JoursFeriesService } from '../shared/service/jours-feries.service';
import { AbsenceService } from '../shared/service/absence.service';
import {NgbModal,NgbModalRef, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { JourFerie } from '../shared/domain/jour-ferie';
import { FerieType, FERIE_TYPES } from '../shared/domain/ferie-type.enum';
import {IMyDpOptions, IMyDateModel,IMyDate} from 'mydatepicker';
import { AbsenceStatut, ABSENCES_STATUS } from '../absence-statut.enum';
import { concat } from 'rxjs/operators/concat';

@Component({
  selector: 'app-form-jour-ferie',
  templateUrl: './form-jour-ferie.component.html',
  styleUrls: ['./form-jour-ferie.component.css']
})
export class FormJourFerieComponent implements OnInit {
  // Absence concerné par le formulaire
  @Input() jourFerie:JourFerie;
  // Nom de l'action permettant d'identifier le rôle du formulaire (ajout ou modification)
  @Input() action:string;
  // Attributs permettant d'afficher le bouton d'ouverture de la modale
  add:boolean = false; // affiche le bouton pour ajouter une absence
  modif:boolean = false; // affiche le bouton pour modifier une absence
  // Titre du formulaire
  titre:string;
  // Attribut permettant d'activer ou non le boutons pour soumettre le formulaire
  isValid: boolean = false;
  // Attribut permettant d'afficher une alerte si la date est invalides
  isInvalidDate:boolean = false;
  // Options du select des types d'absences
  options:any = FERIE_TYPES;
  // Message d'erreur ou de succès suite à l'envoi des données sur le serveur
  msg:string
  // Message d'erreur suite à la saisie d'une mauvaise date
  msgDate:string
  // Attribut permettant d'afficher ou non le message d'alert msg
  succesAjout:boolean = false;
  alertActive:boolean = false;

  isRequiredComment:boolean = false;

  // Paramètres de la modale
  closeResult: string;
  dialog: NgbModalRef | null;

  // Options du DatePicker
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    dayLabels: {su: 'Dim', mo: 'Lun', tu: 'Mar',we: 'Mer', th: 'Je', fr: 'Ven', sa: 'Sam'},
    monthLabels : { 1: 'Jan', 2: 'Fev', 3: 'Mar', 4: 'Avr', 5: 'Mai', 6: 'Jui', 7: 'Jui', 8: 'Aoû', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' },
    todayBtnTxt : "Aujourd'hui",
    firstDayOfWeek: "mo",
    satHighlight: true
  };

  // Attributs pour modifier la valeur de la date
  private selDate: IMyDate = {year: 0, month: 0, day: 0};
  // Objet qui récupère la date  saisie
  date:Date;
  // Objet qui récupère la date saisie en milliseconde
  dateNumber:any;
  // Objet Date qui stock la date actuelle
  currentDate:Date;


  constructor(private jourFerieService:JoursFeriesService,private absenceService:AbsenceService,private modalService: NgbModal) { }

  ngOnInit() {
    this.currentDate = new Date();
    // initialisation du formulaire selon son rôle
    if(this.action === "add") {
      this.isValid = false;
      this.add = true;
      this.titre = "Nouveau jour férié / RTT employeur"; 
      this.jourFerie = new JourFerie(0,this.currentDate,"","","");
      this.selDate = {year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() +1, day: this.currentDate.getDate()+1};
      this.currentDate.setDate(this.currentDate.getDate()+1);
      this.date = this.currentDate;

    } else if(this.action === "update") {
      this.isValid = true;
      this.modif = true;
      this.titre = "Modifier un jour férié / RTT employeur";

      //Récupérationn date de début de l'absence
      this.date = new Date(this.jourFerie.date);
      this.selDate = {year: this.date.getFullYear(), month: this.date.getMonth()+1, day:this.date.getDate()};
    }
    // Desactivation des dates precedente à la date actuelle
    this.myDatePickerOptions.disableUntil = {year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() +1, day: this.currentDate.getDate()};
  }

  // Affichage de la modale
  open(content) {
    this.isValid = false;
    this.dialog = this.modalService.open(content);
  }


  submit(absenceForm: NgForm) {
    this.isValid = true;
    // formatage des dates pour le serveur
    let d = this.date.getDate();
    let m = this.date.getMonth() + 1;
    let y = this.date.getFullYear();
    this.jourFerie.date = y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    this.jourFerie.statut = AbsenceStatut.INITIALE;
    
    if(this.action === "add") {
      this.jourFerieService.sauvegarderJourFerie(this.jourFerie).subscribe(result => {
        this.alertActive = false;
        absenceForm.resetForm();
        if(result != null) {
          if ( this.dialog ) {
            this.dialog.dismiss();
            this.dialog = null;
         }
        }		else {
          this.alertActive = true;
          this.msg = "Votre demande n'a pas pu être ajouté."
        }
        // Mise à jour des absences suite à la soumission du formulaire
        this.jourFerieService.refreshJoursFeries();
        this.absenceService.refreshAbsencesByMatricule();
        
      },err => {
        this.alertActive = true;
        if(err && err.error) {
          this.msg = err.error.message;
        } else {
          this.msg = "Votre demande n'a pas pu être ajouté.";
        }
        this.isValid = true;
        // Mise à jour des absences suite à la soumission du formulaire
        this.jourFerieService.refreshJoursFeries();
        this.absenceService.refreshAbsencesByMatricule();

      },
    );
    } else if(this.action === "update") {
      this.jourFerieService.modifierJourFerie(this.jourFerie).subscribe(result => {
        this.alertActive = false;
        if(result != null) {
          absenceForm.resetForm();
          if ( this.dialog ) {
            this.dialog.dismiss();
            this.dialog = null;
         }
        }		else {
          this.alertActive = true;
          this.msg = "Votre demande n'a pas pu être modifié.";
        }
        // Mise à jour des absences suite à la soumission du formulaire
        this.jourFerieService.refreshJoursFeries();
        this.absenceService.refreshAbsencesByMatricule();
        
      },err => {
        this.alertActive = true;
        if(err && err.error) {
          this.msg = err.error.message;
        } else {
          this.msg = "Votre demande n'a pas pu être modifié.";
        }
        
        this.isValid = true;
        // Mise à jour des absences suite à la soumission du formulaire
        this.jourFerieService.refreshJoursFeries();
        this.absenceService.refreshAbsencesByMatricule();

      });
    }
  }

  // Ecouteur sur la date
  onDateChanged(event: IMyDateModel) {
    this.date = event.jsdate;
    // test si la date est un samedi ou dimanche pour le RTT employeur
    if(this.jourFerie.type === FerieType.JOUR_FERIE && (this.date.getDay() === 0 || this.date.getDay() === 6)) {
      this.isInvalidDate = true;
      this.msgDate = "Il est interdit de saisir une RTT employeur un samedi ou un dimanche";
      this.isValid = false;
    } else {
      this.isInvalidDate = false;
      this.isValid = true;
    }
    this.onAlertChanged(event);
  }

  // Ecouteur sur le bouton valider et le select
  onAlertChanged(event: any) {
    this.isValid = false;
     // test si la date est un samedi ou dimanche pour le RTT employeur
     if(this.jourFerie.type === FerieType.JOUR_FERIE && (this.date.getDay() === 0 || this.date.getDay() === 6)) {
       this.isInvalidDate = true;
       this.msgDate = "Il est interdit de saisir une RTT employeur un samedi ou un dimanche";
       this.isValid = false;
     } else {
       this.isInvalidDate = false;
       this.isValid = true;
     }
    
    // test du type
    if(this.jourFerie.type === FerieType.JOUR_FERIE) {
      this.isRequiredComment = true;
      if(this.jourFerie.commentaire != null && !this.isInvalidDate) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    } else {
      this.isRequiredComment = false;
    }
  }

  // Fermeture de l'alert par la croix
  closeAlert() {
		this.alertActive = false;
  }

  cancel(absenceForm) {
    this.closeAlert();
    this.isValid = false;
    this.isInvalidDate = false;
    absenceForm.reset();
    this.dialog.close();
  }

  private isValidCommentaire() {
    if(this.jourFerie.type === FerieType.JOUR_FERIE && this.jourFerie.commentaire != null){
      this.isValid = true;
    } else {
      this.isValid = true;
    }
  }

}
