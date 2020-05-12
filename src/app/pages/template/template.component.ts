import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: 'Ezequiel',
    apellido: 'Gavilán',
    email: 'ezegavilan95@gmail.com',
    pais: 'ARG'
  };

  paises: any[] = [];

  constructor(private paisService: PaisService) { }

  ngOnInit() {
    this.paisService.getPaises()
    .subscribe( paises => {
      this.paises = paises;
      this.paises.unshift({
        nombre: 'Seleccione un país',
        codigo: ''
      });
    });
  }

  guardar( forma: NgForm ) {
    console.log(forma);
    console.log(forma.valid);

    if (forma.invalid) {
      Object.values(forma.controls).forEach( control => {
        control.markAsTouched();
      });
      return;
    }

    console.log(forma.value);
  }
}
