import { Component, OnInit,Input } from '@angular/core';
import { Collaborateur } from "../shared/domain/collaborateur";
import { ExcelService } from "../shared/service/excel.service";

@Component({
  selector: 'app-export-csv',
  templateUrl: './export-csv.component.html',
  styleUrls: ['./export-csv.component.css']
})
export class ExportCsvComponent implements OnInit {

  // tableau des collaborateurs
  @Input() collaborateurs: Collaborateur[] = [];
  constructor(private excelService:ExcelService) { }

  ngOnInit() {
  }

  exporterCSV() {
    let table = (document.getElementById('table')) as HTMLTableElement;
   
    let cols = table.tHead.rows[0].cells;
    let rows = table.rows;
    let data:any = [];
    console.log('rows',rows);

    for(let i=1;i<rows.length;i++) {
      let ligne:any = {};
      for(let j=0;j<rows[i].cells.length;j++) {
        let col:any = parseInt(cols[j].innerHTML);
        if(!col) {
          col = cols[j].innerHTML;
        }
        ligne[col] = rows[i].cells[j].innerHTML;
      }
      data.push(ligne);
    }
    console.log('data', data);
    this.excelService.exportAsExcelFile(data, "rapport_conges");


  }

}
