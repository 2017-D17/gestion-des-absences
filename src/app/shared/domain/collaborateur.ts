export class Collaborateur {



    constructor(
        public matricule: string,
        public nom: string,
        public prenom: string,
        public conges:number, 
        public rtt:number, 
        public departement:string, 
        public role:string[],
        public subalternes:string[]) {}


}
