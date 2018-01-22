import { Collaborateur } from './collaborateur';
export class Absence {
    constructor(public id:number, public dateDebut:any, public dateFin:any,public type: string, public motif: string, public statut: string, public collaborateur: Collaborateur){
	}
}
