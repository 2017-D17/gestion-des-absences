import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs/operator/filter';
import { Collaborateur } from '../domain/collaborateur';

@Pipe({
  name: 'deptMonthYearFilter'
})
export class DeptMonthYearFilterPipe implements PipeTransform {

  transform(items: Collaborateur[], filtre: any, currentDatetime:Date): any {
    if(!items || !filtre || !filtre.annee) {
      return items;
    } 
    return items.filter(c => c.departement === filtre.departement);
  }

}
