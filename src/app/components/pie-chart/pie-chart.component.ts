import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent  implements OnInit {

  //Estas variables se reciben como parámetro de home
  @Input() backgroundColorCategorias: string[] = [];
  @Input() borderColorCategorias: string[] = [];

  constructor() { }

  ngOnInit() {
    console.log("Ejecuta pie-chart");
  }

}
