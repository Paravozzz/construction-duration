import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ObjectRecord} from "../../type/object-record";
import {MatDialogRef} from "@angular/material/dialog";

const data: ObjectRecord[] =
  [
    {
      subsection: "КОММУНАЛЬНОЕ ХОЗЯЙСТВО",
      object: "Распределительная газовая сеть из стальных труб в две нитки диаметром 200-600 мм",
      attribute: "Протяженность",
      values: ['1', '3'],
      values_type: 'single',
      unit: "км",
      duration: [[2.5, 0.1],[3.5, 0.2]]
    },
    {
      subsection: "КОММУНАЛЬНОЕ ХОЗЯЙСТВО",
      object: "Распределительная газовая сеть из стальных труб в одну нитку диаметром до 200 мм",
      attribute: "Протяженность",
      values: ['1', '3', '10'],
      values_type: 'single',
      duration: [[1, 0.1],[2, 0.2],[5, 0.5]],
      unit: "км"
    },
    {
      subsection: "КОММУНАЛЬНОЕ ХОЗЯЙСТВО",
      object: "Распределительная газовая сеть из стальных труб в одну нитку диаметром 200-600 мм",
      attribute: "Протяженность",
      values: ['1', '3', '10'],
      values_type: 'single',
      unit: "км",
      duration: [[1.5, 0.1],[3, 0.2],[8.5, 0.5]]
    },
    {
      subsection: "КОММУНАЛЬНОЕ ХОЗЯЙСТВО",
      object: "Распределительная газовая сеть из полиэтиленовых труб в одну нитку диаметром до 200 мм",
      attribute: "Протяженность",
      values: ['1', '3', '10'],
      values_type: 'single',
      unit: "км",
      duration: [[1, 0.1],[1.5, 0.2],[3.5, 0.5]]
    },
    {
      subsection: "МАГИСТРАЛЬНЫЙ ТРУБОПРОВОДНЫЙ ТРАНСПОРТ",
      object: "Магистральный трубопровод (линейная часть)",
      attribute: "Протяженность",
      values: ['20', '50', '100', '200', '300', '>300'],
      values_type: 'mixed',
      unit: "км",
      duration: [[10, 4, 5, 5],[12, 5, 5, 6],[16, 6, 6, 7.5], [18, 7, 7, 9], [19, 7, 8, 10.5], [23, 9, 13, 19]]
    },
    {
      subsection: "МАГИСТРАЛЬНЫЙ ТРУБОПРОВОДНЫЙ ТРАНСПОРТ",
      object: "Подводный переход",
      attribute: "Ширина водной преграды, до",
      values: ['100', '300', '500', '1000','>1000'],
      values_type: 'mixed',
      unit: "м",
      duration: [[4,1,2,2.5],[5,1,3,3],[6,1,4,3.5],[8,2,5,5],[10,2,6,5.5]]
    },
    {
      subsection: "МАГИСТРАЛЬНЫЙ ТРУБОПРОВОДНЫЙ ТРАНСПОРТ",
      object: "Промысловые трубопроводы",
      attribute: "Протяженность, до",
      values: ['2', '5', '10', '10-20'],
      values_type: 'mixed',
      unit: "км",
      duration: [[2,1,2,1.5],[2,1,2,1.5],[2,1,2,1.5],[2,1,2,1.5]]
    },
    {
      subsection: "МАГИСТРАЛЬНЫЙ ТРУБОПРОВОДНЫЙ ТРАНСПОРТ",
      object: "Головная насосная станция в комплектно-блочном исполнении",
      attribute: "Мощность",
      values: ['8', '20', '28', '42-90'],
      values_type: 'mixed',
      unit: "млн. т/год",
      duration: [[9,2,3,7],[12,2,4,9.5],[15,3,4,12.5],[18,3,6,14.5]]
    },
    {
      subsection: "МАГИСТРАЛЬНЫЙ ТРУБОПРОВОДНЫЙ ТРАНСПОРТ",
      object: "Головная насосная станция в комплектно-блочном исполнении",
      attribute: "Мощность (подача насосов)",
      values: ['1.25', '2.5', '3.6', '7-12.5'],
      values_type: 'mixed',
      unit: "куб.м/ч",
      duration: [[9,2,3,7],[12,2,4,9.5],[15,3,4,12.5],[18,3,6,14.5]]
    },
    {
      subsection: "МОСТЫ И ТОННЕЛИ",
      object: "Железнодорожный мост однопутный",
      attribute: "Длина",
      values: ['<=100', '>100-200', '>200-300', '>300-400', '>400-500'],
      values_type: 'range',
      unit: "м",
      duration: [[10,2],[12,2],[14,2],[16,3],[18,3]]
    },
    {
      subsection: "МОСТЫ И ТОННЕЛИ",
      object: "Автодорожный мост длиной 50 м",
      attribute: "Ширина проезжей части",
      values: ['6.5', '8', '10', '11.5', '16.5', '24'],
      values_type: 'single',
      unit: "м",
      duration: [[5,1],[5,1],[6,1],[6,1],[7,1],[8,1]]
    },
    {
      subsection: "МОСТЫ И ТОННЕЛИ",
      object: "Автодорожный мост длиной 100 м",
      attribute: "Ширина проезжей части",
      values: ['6.5', '8', '10', '11.5', '16.5', '24'],
      values_type:'single',
      unit: "м",
      duration: [[9,2],[9,2],[10,2],[10,2],[11,3],[13,3]]
    }
  ];

@Component({
  // selector: 'app-snip-table',
  templateUrl: './snip-table.component.html',
  styleUrls: ['./snip-table.component.css']
})
export class SnipTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['subsection', 'object', 'attribute', 'unit'];
  dataSource = new MatTableDataSource<ObjectRecord>(data);
  selectedRow?: ObjectRecord;

  constructor(public dialogRef: MatDialogRef<SnipTableComponent>) {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  setSelected(row: ObjectRecord) {
    this.selectedRow = row;
  }

  onDblClick(row: ObjectRecord) {
    this.dialogRef.close(row);
  }
}
