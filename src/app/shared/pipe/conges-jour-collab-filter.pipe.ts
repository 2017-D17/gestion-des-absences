import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'congesJourCollabFilter'
})
export class CongesJourCollabFilterPipe implements PipeTransform {

  transform(type: string, matricule:string, day:string): any {
    console.log('matricule', matricule);
    console.log('matricule', day);
    // let matricule = filter.matricule;
    return type;
  }

}
