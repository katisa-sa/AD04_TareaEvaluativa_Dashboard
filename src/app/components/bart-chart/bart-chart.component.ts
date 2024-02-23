import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bart-chart',
  templateUrl: './bart-chart.component.html',
  styleUrls: ['./bart-chart.component.scss'],
})
export class BartChartComponent  implements OnInit {

  //Estas variables se reciben como parámetro de home
  @Input() backgroundColorCategorias: string[] = [];
  @Input() borderColorCategorias: string[] = [];

  constructor() { }

  ngOnInit() {
    console.log("Ejecuta bar-chart");
  }

}
