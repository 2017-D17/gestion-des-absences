import { Component, Input,OnInit,ViewChild } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { AbsenceService } from '../shared/service/absence.service';
import {NgbModal,NgbModalRef, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Absence } from '../shared/domain/absence';
import { Collaborateur } from '../shared/domain/collaborateur';
import { AbsenceType, ABSENCES_TYPES } from '../shared/domain/absence-type.enum';
import {IMyDpOptions, IMyDateModel,IMyDate} from 'mydatepicker';
import { AbsenceStatut, ABSENCES_STATUS } from '../absence-statut.enum';

@Component({
  selector: 'app-form-absence',
  templateUrl: './form-absence.component.html',
  styleUrls: ['./form-absence.component.css']
})
export class FormAbsenceComponent implements OnInit {
  // Absence concerné par le formulaire
  @Input() absence:Absence;
  // Nom de l'action permettant d'identifier le rôle du formulaire (ajout ou modification)
  @Input() action:string;
  // Attributs permettant d'afficher le bouton d'ouverture de la modale
  add:boolean = false; // affiche le bouton pour ajouter une absence
  modif:boolean = false; // affiche le bouton pour modifier une absence
  // Titre du formulaire
  titre:string;
  // Collaborateur connecté
  collaborateur:Collaborateur;
  // Attribut permettant d'activer ou non le boutons pour soumettre le formulaire
  isValid: boolean = false;
  // Attribut permettant d'afficher une alerte si les dates sont invalides
  isInvalidDate:boolean = false;
  // Options du select des types d'absences
  options:any = ABSENCES_TYPES;
  // Message d'erreur ou de succès suite à l'envoi des données sur le serveur
  msg:string
  // Attribut permettant d'afficher ou non le message d'alert msg
  succesAjout:boolean = false;
  alertActive:boolean = false;

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

  // Attributs pour modifier la valeur des dates
  private selDateDebut: IMyDate = {year: 0, month: 0, day: 0};
  private selDateFin: IMyDate = {year: 0, month: 0, day: 0};
  // Objet qui récupère la date de début saisie
  dateDebut:any;
  // Objet qui récupère la date de fin saisie
  dateDeFin:any;
  // Objet qui récupère la date de début saisie en milliseconde
  dateDebutNumber:any;
  // Objet qui récupère la date de fin saisie en milliseconde
  dateDeFinNumber:any;
  // Objet Date qui stock la date actuelle
  currentDate:Date;

  constructor(private absenceService:AbsenceService,private modalService: NgbModal) {}
  // @ViewChild(NgForm) absenceForm: NgForm;

  ngOnInit() {
    // récupération du collaborateur connecté
    this.absenceService.subjectCollaborateur.subscribe(data => this.collaborateur = data);
    this.currentDate = new Date();
    // initialisation du formulaire selon son rôle
    if(this.action === "add") {
      this.add = true;
      this.titre = "Demande d'absence"; 
      this.absence = new Absence(0,"","","","","",this.collaborateur);
      this.selDateDebut = {year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() +1, day: this.currentDate.getDate()+1};
      this.selDateFin = {year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() +1, day: this.currentDate.getDate()+1};
      console.log('currentDate', this.currentDate);
      this.currentDate.setDate(this.currentDate.getDate()+1);
      this.dateDebut = this.currentDate;
      this.dateDeFin = this.currentDate;
      this.dateDebutNumber = Date.parse(this.dateDebut); //conversion date en millisecond pour tester le chevauchement
      this.dateDeFinNumber = Date.parse(this.dateDeFin); //conversion date date en millisecond pour tester le chevauchement
      console.log('this.dateDebut', this.dateDebut);
      console.log('this.dateDeFin', this.dateDeFin);
      console.log('this.dateDebutNumber', this.dateDebutNumber);
      console.log('this.dateDeFinNumber', this.dateDeFinNumber);

    } else if(this.action === "update") {
      this.isValid = true;
      this.modif = true;
      this.titre = "Modifier une absence";

      //Récupérationn date de début de l'absence
      let dateDebutnumb:any = Date.parse(this.absence.dateDebut);
      let deb:Date = new Date(dateDebutnumb);
      this.selDateDebut = {year: deb.getFullYear(), month: deb.getMonth()+1, day:deb.getDate()};
      this.dateDebut = deb;
      //Récupérationn date de fin de l'absence
      let dateFinnum:any = Date.parse(this.absence.dateFin);
      let fin:Date = new Date(dateFinnum);
      this.selDateFin = {year: fin.getFullYear(), month: fin.getMonth()+1, day:fin.getDate()};
      this.dateDeFin = fin;
      this.dateDebutNumber = Date.parse(this.dateDebut); //conversion date en millisecond pour tester le chevauchement
      this.dateDeFinNumber = Date.parse(this.dateDeFin); //conversion date date en millisecond pour tester le chevauchement
    }
    // Desactivation des dates precedente à la date actuelle
    this.myDatePickerOptions.disableUntil = {year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() +1, day: this.currentDate.getDate()};
  }

  // Affichage de la modale
  open(content) {
    this.dialog = this.modalService.open(content);
    this.dialog.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  // Disparition de la modale
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  submit(absenceForm: NgForm) {
    this.isValid = true;
    this.absence.dateDebut = this.dateDebut.getFullYear() + "-" + this.dateDebut.getMonth() + 1 + "-"  + this.dateDebut.getDate() ;
    this.absence.dateFin = this.dateDeFin.getFullYear() + "-" + this.dateDeFin.getMonth() + 1 + "-"  + this.dateDeFin.getDate() ;
    this.absence.statut = AbsenceStatut.INITIALE;
    console.log(this.absence);
    
    if(this.action === "add") {
      this.absenceService.sauvegarderAbsence(this.absence).subscribe(result => {
        this.alertActive = false;
        console.log('result ',result);
        absenceForm.resetForm();
        if(result != null) {
          // this.cancel(absenceForm);
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
        this.msg = err.error.message;
        this.isValid = true;
        // Mise à jour des absences suite à la soumission du formulaire
        this.absenceService.refreshAbsencesByMatricule();

      },
    );
    } else if(this.action === "update") {
      this.absenceService.modifierAbsence(this.absence).subscribe(result => {
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
          this.msg = "Votre demande n'a pas pu être modifié."
        }
        // Mise à jour des absences suite à la soumission du formulaire
        this.absenceService.refreshAbsencesByMatricule();
        
      },err => {
        console.log(err);
        this.alertActive = true;
        this.msg = err.error.message;
        this.isValid = true;
        // Mise à jour des absences suite à la soumission du formulaire
        this.absenceService.refreshAbsencesByMatricule();

      });
    }
  }

  // Ecouteur sur la de début
  onDateDebutChanged(event: IMyDateModel) {
    this.dateDebut = event.jsdate;
    this.dateDebutNumber = Date.parse(this.dateDebut); //conversion date en millisecond pour tester le chevauchement
    this.dateDeFinNumber = Date.parse(this.dateDeFin); //conversion date date en millisecond pour tester le chevauchement
    console.log('this.dateDebutNumber', this.dateDebutNumber);
    console.log('this.dateDeFinNumber', this.dateDeFinNumber);

    // test si la date de début est valide
    if(this.dateDebutNumber > this.dateDeFinNumber) {
      this.dateDebut = event.jsdate;
      this.isInvalidDate = true;
    } else {
      this.isInvalidDate = false;
    }
    this.onAlertChanged(event);
  }

  // Ecouteur sur la de fin
  onDateFinChanged(event: IMyDateModel) {
    this.dateDeFin = event.jsdate;
    this.dateDebutNumber = Date.parse(this.dateDebut); //conversion date en millisecond pour tester le chevauchement
    this.dateDeFinNumber = Date.parse(this.dateDeFin); //conversion date date en millisecond pour tester le chevauchement
    console.log('this.dateDebutNumber', this.dateDebutNumber);
    console.log('this.dateDeFinNumber', this.dateDeFinNumber);

    // test si la date de fin est valide
    if(this.dateDebutNumber > this.dateDeFinNumber) {
      this.dateDeFin= event.jsdate;
      this.isInvalidDate = true;
    }else {
      this.isInvalidDate = false;
    }
    this.onAlertChanged(event);
  }

  // Ecouteur sur le bouton valider
  onAlertChanged(event: any) {
    console.log('this.absence.motif ',this.absence.motif);
    console.log('this.absence.typ ',this.absence.type);
    console.log('this.dateDebutNumber', this.dateDebutNumber);
    console.log('this.dateDeFinNumber', this.dateDeFinNumber);
    this.isValid = false;
    if(this.dateDebutNumber <= this.dateDeFinNumber ) {
      if(this.absence.type === "CONGE_SANS_SOLDE" && this.absence.motif != null ) {
        this.isValid = true;
      } else if (this.absence.type != "CONGE_SANS_SOLDE" && this.absence.type != "") {
        this.isValid = true;
      }
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

  


}
