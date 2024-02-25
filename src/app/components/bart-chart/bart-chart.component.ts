import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Chart, ChartType } from 'chart.js';
import { GestionApiService } from 'src/app/services/gestion-api.service';

@Component({
  selector: 'app-bart-chart',
  templateUrl: './bart-chart.component.html',
  styleUrls: ['./bart-chart.component.scss'],
})
export class BartChartComponent  implements OnInit {

  //Estas variables se reciben como parámetro desde tab6, pero no desde tab7.
  @Input() categoria: string[] = [];
  @Input() datosCategorias: number[] = [];
  @Input() nombresCategorias: string[] = [];
  //Estas variables se reciben como parámetro de home
  @Input() backgroundColorCategorias: string[] = [];
  @Input() borderColorCategorias: string[] = [];
  @Input() tipoChartSelected: string = "";

  public chart!: Chart;
  public apiData: { categoria: string; totalResults: number}[]=[];

  constructor(private el: ElementRef, private renderer: Renderer2, private gestionServiceApi: GestionApiService) {}
 
  ngOnInit(): void {
    console.log("Ejecuta bar-chart");
    this.inicializarChart();

    //Nos suscribimos al observable de tipo BehaviorSubject y cuando este emita un valor, recibiremos una notificación con el nuevo valor.
    this.gestionServiceApi.datos$.subscribe((datos) => {
      if (datos != undefined) {
        //Cuando recibimos un valor actualizamos los arrays de nombre y valor de categorias, para guardar el nombre y su valor en las mismas posiciones del array.
        this.nombresCategorias.push(datos.categoria);
        this.datosCategorias.push(datos.totalResults);
        //Actualizamos el chart con los nuevos valores cada vez que recibimos un valor.
        this.chart.update();
      }
    });
  }

  private inicializarChart() {

    let data = null;
  
    if (this.tipoChartSelected === "bar-chart"){
      // datos
      data = {
        labels: this.nombresCategorias,
        datasets: [{
          label: 'My First Dataset',
          data: this.datosCategorias,
          fill: false,
          backgroundColor: this.backgroundColorCategorias,
          borderColor: this.borderColorCategorias,
          tension: 0.1
        }]
      };
    }
    
  
    // Creamos la gráfica
    const canvas = this.renderer.createElement('canvas');
    this.renderer.setAttribute(canvas, 'id', 'barChart');
  
    // Añadimos el canvas al div con id "chartContainer"
    const container = this.el.nativeElement.querySelector('#contenedor-barchart');
    this.renderer.appendChild(container, canvas);
  
    this.chart = new Chart(canvas, {
      type: 'bar' as ChartType, // tipo de la gráfica 
      data: {
        labels:[],
        datasets: datasetsByCompany
      }, // datos 
      options: { // opciones de la gráfica
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            labels: {
              boxWidth: 0,
              font: {
                size: 16,
                weight: 'bold'
              }
            },
          }
        },
      }
    });
    
    this.chart.canvas.width = 100;
    this.chart.canvas.height = 100;
  }
  private actualizarChart() {
    const datasetsByCompany: {[key: string]: { label: string; data: number[]; backgroundColor: string[]; borderColor: string[]; borderWidth: number}} = {};
    this.apiData.forEach((row: {categoria: string; totalResults: number;}, index: number);
    const categoria = row.categoria;
    const totalResults = row.totalResults;
   
      if(!datasetsByCompany[categoria]) = {
        label: 'Valores de ' + this.datosCategorias,
        data: [],
        backgroundColor: [this.backgroundColorCategorias[index]],
        borderColor: [this.borderColorCategorias[index]],
        borderWidth: 1
      };  

      datasetsByCompany[categoria].data[index] = totalResults;
      datasetsByCompany[categoria].backgroundColor[index] = this.backgroundColorCategorias[index];
      datasetsByCompany[categoria].borderColor[index] = this.borderColorCategorias[index];
      );

      //this.chart.data.labels = this.apiData.map((row: { categoria: string; totalResults: number }) => row.categoria);

      this.chart.data.labels = [];
      this.apiData.forEach((row: { categoria: string; totalResults: number }) => {
        if (this.chart.data.labels){
         this.chart.data.labels.push(row.categoria);
        }
    });
    this.chart.data.datasets = Object.values(datasetsByCompany);
    this.chart.update(); 
  }
}
