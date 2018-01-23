import { Component, Input,OnInit,ViewChild } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { AbsenceService } from '../shared/service/absence.service';
import {NgbModal,NgbModalRef, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { JourFerie } from '../shared/domain/jour-ferie';
import { FerieType, FERIE_TYPES } from '../shared/domain/ferie-type.enum';
import {IMyDpOptions, IMyDateModel,IMyDate} from 'mydatepicker';
import { AbsenceStatut, ABSENCES_STATUS } from '../absence-statut.enum';

@Component({
  selector: 'app-form-jour-ferie',
  templateUrl: './form-jour-ferie.component.html',
  styleUrls: ['./form-jour-ferie.component.css']
})
export class FormJourFerieComponent implements OnInit {
  // Absence concerné par le formulaire
  @Input() absence:JourFerie;
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
  date:any;
  // Objet qui récupère la date saisie en milliseconde
  dateNumber:any;
  // Objet Date qui stock la date actuelle
  currentDate:Date;


  constructor(private absenceService:AbsenceService,private modalService: NgbModal) { }

  ngOnInit() {
    this.currentDate = new Date();
    // initialisation du formulaire selon son rôle
    if(this.action === "add") {
      this.add = true;
      this.titre = "Nouveau jour férié / RTT employeur"; 
      this.absence = new JourFerie(0,this.currentDate,"","","");
      this.selDate = {year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() +1, day: this.currentDate.getDate()+1};
      console.log('currentDate', this.currentDate);
      this.currentDate.setDate(this.currentDate.getDate()+1);
      this.date = this.currentDate;
      this.dateNumber = Date.parse(this.date); //conversion date en millisecond pour tester le chevauchement
      console.log('this.date', this.date);
      console.log('this.dateNumber', this.dateNumber);

    } else if(this.action === "update") {
      this.isValid = true;
      this.modif = true;
      this.titre = "Modifier un jour férié / RTT employeur";

      //Récupérationn date de début de l'absence
      this.selDate = {year: this.absence.date.getFullYear(), month: this.absence.date.getMonth()+1, day:this.absence.date.getDate()};
    }
    // Desactivation des dates precedente à la date actuelle
    this.myDatePickerOptions.disableUntil = {year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() +1, day: this.currentDate.getDate()};
  }

  // Affichage de la modale
  open(content) {
    this.dialog = this.modalService.open(content);
    // this.dialog.result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
  }

  // Disparition de la modale
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }

  submit(absenceForm: NgForm) {
    this.isValid = true;
    this.absence.date = this.date.getFullYear() + "-" + this.date.getMonth() + 1 + "-"  + this.date.getDate() ;
    this.absence.statut = AbsenceStatut.INITIALE;
    console.log(this.absence);
    
    if(this.action === "add") {
      this.absenceService.sauvegarderJourFerie(this.absence).subscribe(result => {
        this.alertActive = false;
        console.log('result ',result);
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
        this.absenceService.refreshAbsencesByMatricule();
        
      },err => {
        console.log(err);
        this.alertActive = true;
        if(err && err.error) {
          this.msg = err.error.message;
        } else {
          this.msg = "Votre demande n'a pas pu être ajouté.";
        }
        this.isValid = true;
        // Mise à jour des absences suite à la soumission du formulaire
        this.absenceService.refreshAbsencesByMatricule();

      },
    );
    } else if(this.action === "update") {
      this.absenceService.modifierJourFerie(this.absence).subscribe(result => {
        this.alertActive = false;
        console.log('result ',result);
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
        this.absenceService.refreshAbsencesByMatricule();
        
      },err => {
        console.log(err);
        this.alertActive = true;
        if(err != null || err.error != null) {
          this.msg = err.error.message;
        } else {
          this.msg = "Votre demande n'a pas pu être modifié.";
        }
        
        this.isValid = true;
        // Mise à jour des absences suite à la soumission du formulaire
        this.absenceService.refreshAbsencesByMatricule();

      });
    }
  }

  // Ecouteur sur la date
  onDateChanged(event: IMyDateModel) {
    this.date = event.jsdate;
    // test si la date est un samedi ou dimanche pour le RTT employeur
    console.log('this.date.getDay() ',this.date.getDay());
    if(this.absence.type === FerieType.JOUR_FERIE && (this.date.getDay() === 0 || this.date.getDay() === 6)) {
      this.isInvalidDate = true;
      this.msgDate = "Il est interdit de saisir une RTT employeur un samedi ou un dimanche";
      this.isValid = false;
    } else {
      this.isInvalidDate = false;
      this.isValid = true;
    }
    console.log('this.isInvalidDate ',this.isInvalidDate);
    this.onAlertChanged(event);
  }

  // Ecouteur sur le bouton valider et le select
  onAlertChanged(event: any) {
    this.isValid = false;
    console.log('this.absence.commentaire ',this.absence.commentaire);
    console.log('this.absence.type ',this.absence.type);
     // test si la date est un samedi ou dimanche pour le RTT employeur
     console.log('this.date.getDay() ',this.date.getDay());
     if(this.absence.type === FerieType.JOUR_FERIE && (this.date.getDay() === 0 || this.date.getDay() === 6)) {
       this.isInvalidDate = true;
       this.msgDate = "Il est interdit de saisir une RTT employeur un samedi ou un dimanche";
       this.isValid = false;
     } else {
       this.isInvalidDate = false;
       this.isValid = true;
     }
    
    // test du type
    if(this.absence.type === FerieType.JOUR_FERIE) {
      this.isRequiredComment = true;
      if(this.absence.commentaire != null && !this.isInvalidDate) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    } else {
      this.isRequiredComment = false;
    }

    console.log('valid',this.isValid );
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
    if(this.absence.type === FerieType.JOUR_FERIE && this.absence.commentaire != null){
      this.isValid = true;
    } else {
      this.isValid = true;
    }
  }

}
