import { Collaborateur } from "./collaborateur";

export class Absence {
  constructor(
    public id: number,
    public matricule: string,
    public dateDebut: string,
    public dateFin: string,
    public type: string,
    public motif: string,
    public statut: string,
    public collab: Collaborateur
  ) {}
}
