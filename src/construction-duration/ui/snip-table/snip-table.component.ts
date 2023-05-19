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
      unit: "км"
    },
    {
      subsection: "КОММУНАЛЬНОЕ ХОЗЯЙСТВО",
      object: "Распределительная газовая сеть из стальных труб в одну нитку диаметром до 200 мм",
      attribute: "Протяженность",
      values: ['1', '3', '10'],
      unit: "км"
    },
    {
      subsection: "КОММУНАЛЬНОЕ ХОЗЯЙСТВО",
      object: "Распределительная газовая сеть из стальных труб в одну нитку диаметром 200-600 мм",
      attribute: "Протяженность",
      values: ['1', '3', '10'],
      unit: "км"
    },
    {
      subsection: "КОММУНАЛЬНОЕ ХОЗЯЙСТВО",
      object: "Распределительная газовая сеть из полиэтиленовых труб в одну нитку диаметром до 200 мм",
      attribute: "Протяженность",
      values: ['1', '3', '10'],
      unit: "км"
    },
    {
      subsection: "МАГИСТРАЛЬНЫЙ ТРУБОПРОВОДНЫЙ ТРАНСПОРТ",
      object: "Магистральный трубопровод (линейная часть)",
      attribute: "Протяженность",
      values: ['20', '50', '100', '200', '300', '>300'],
      unit: "км"
    },
    {
      subsection: "МАГИСТРАЛЬНЫЙ ТРУБОПРОВОДНЫЙ ТРАНСПОРТ",
      object: "Подводный переход",
      attribute: "Ширина водной преграды, до",
      values: ['100', '300', '500', '1000','>1000'],
      unit: "м"
    },
    {
      subsection: "МАГИСТРАЛЬНЫЙ ТРУБОПРОВОДНЫЙ ТРАНСПОРТ",
      object: "Промысловые трубопроводы",
      attribute: "Протяженность, до",
      values: ['2', '5', '10', '10-20'],
      unit: "км"
    },
    {
      subsection: "МАГИСТРАЛЬНЫЙ ТРУБОПРОВОДНЫЙ ТРАНСПОРТ",
      object: "Головная насосная станция в комплектно-блочном исполнении",
      attribute: "Мощность",
      values: ['8', '20', '28', '42-90'],
      unit: "млн. т/год"
    },
    {
      subsection: "МАГИСТРАЛЬНЫЙ ТРУБОПРОВОДНЫЙ ТРАНСПОРТ",
      object: "Головная насосная станция в комплектно-блочном исполнении",
      attribute: "Мощность (подача насосов)",
      values: ['1.25', '2.5', '3.6', '7-12.5'],
      unit: "куб.м/ч"
    },
    {
      subsection: "МОСТЫ И ТОННЕЛИ",
      object: "Железнодорожный мост однопутный",
      attribute: "Длина",
      values: ['<=100', '>100-200', '>200-300', '>300-400', '>400-500'],
      unit: "м"
    },
    {
      subsection: "МОСТЫ И ТОННЕЛИ",
      object: "Автодорожный мост длиной 50 м",
      attribute: "Ширина проезжей части",
      values: ['6.5', '8', '10', '11.5', '16.5', '24'],
      unit: "м"
    },
    {
      subsection: "МОСТЫ И ТОННЕЛИ",
      object: "Автодорожный мост длиной 100 м",
      attribute: "Ширина проезжей части",
      values: ['6.5', '8', '10', '11.5', '16.5', '24'],
      unit: "м"
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
