import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  form: FormGroup;
  usuario = {
    nombre: 'Ezequiel',
    apellido: 'Gavilan',
    email: 'ezegavilan95@gmail.com',
    direccion: {
      localidad: 'Cordoba',
      ciudad: 'Cordoba'
    },
    pasatiempos: ['Comer', 'Dormir']
  }
  
  constructor(private fb: FormBuilder,
              private validadores: ValidadoresService) {
      this.crearFormulario();
      this.cargarDatos();
    }
    
    ngOnInit() {
    }

    get pasatiempos() {
      return this.form.get('pasatiempos') as FormArray;
    }
    
    get nombreNoValido() {
      return this.form.get('nombre').invalid && this.form.get('nombre').touched;
    }
    
    get apellidoNoValido() {
      return this.form.get('apellido').invalid && this.form.get('apellido').touched;
    }
    
    get emailNoValido() {
      return this.form.get('email').invalid && this.form.get('email').touched;
    }
    
    get localidadNoValido() {
      return this.form.get('direccion.localidad').invalid && this.form.get('direccion.localidad').touched;
    }
    
    get ciudadNoValido() {
      return this.form.get('direccion.ciudad').invalid && this.form.get('direccion.ciudad').touched;
    }
    
    crearFormulario() {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      apellido: ['', [Validators.required, Validators.minLength(4), this.validadores.noGavilan]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      direccion: this.fb.group({
        localidad: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.fb.array([])
    });
  }

  cargarDatos() {
    this.usuario.pasatiempos.forEach(pasatiempo => this.pasatiempos.push(this.fb.control(pasatiempo)));
    this.form.setValue(this.usuario);
  }

  
  
  guardar() {
    console.log(this.form);
    
    if(this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        if(control instanceof FormGroup) {
          Object.values(control.controls).forEach(ctrl => ctrl.markAsTouched());
        }
        control.markAsTouched();
      });
    }
    
    this.form.reset();
    
  }

  agregarPasatiempo() {
    this.pasatiempos.push(
      this.fb.control('')
    );
  }

  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);
  }

}
