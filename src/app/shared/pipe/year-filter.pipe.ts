import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yearFilter'
})
export class YearFilterPipe implements PipeTransform {

  transform(items: any[], yearFilter:number): any {
    if(!items || !yearFilter) {
      return items;
    }
    return items.filter(item => item.date.slice(0, 4) == yearFilter );
  }

}
