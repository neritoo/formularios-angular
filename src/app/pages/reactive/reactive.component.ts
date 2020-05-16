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

  constructor(private fb: FormBuilder,
              private validadores: ValidadoresService) {
      this.crearFormulario();
      this.cargarDatos();
      this.crearListeners();
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

    get usuarioNoValido() {
      return this.form.get('usuario').invalid && this.form.get('usuario').touched;
    }
    
    get localidadNoValido() {
      return this.form.get('direccion.localidad').invalid && this.form.get('direccion.localidad').touched;
    }
    
    get ciudadNoValido() {
      return this.form.get('direccion.ciudad').invalid && this.form.get('direccion.ciudad').touched;
    }

    get pass1NoValido() {
      return this.form.get('pass1').invalid && this.form.get('pass1').touched;
    }

    get pass2NoValido() {
      const pass1 = this.form.get('pass1').value;
      const pass2 = this.form.get('pass2').value;

      return ( pass1 === pass2 ) ? false : true;
    }
    
    crearFormulario() {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      apellido: ['', [Validators.required, Validators.minLength(4), this.validadores.noGavilan]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario: ['', , this.validadores.existeUsuario],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.fb.group({
        localidad: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.fb.array([])
    }, {
      validators: this.validadores.passwordsIguales('pass1', 'pass2')
    }
    );
  }
  
  crearListeners() {
    this.form.get('nombre').valueChanges.subscribe( console.log );
  }

  cargarDatos() {
    ['Comer', 'Dormir'].forEach(pasatiempo => this.pasatiempos.push(this.fb.control(pasatiempo)));
    this.form.setValue({
      nombre: 'Ezequiel',
      apellido: 'Gavilan',
      email: 'ezegavilan95@gmail.com',
      usuario: '',
      pass1: '123',
      pass2: '123',
      direccion: {
        localidad: 'Cordoba',
        ciudad: 'Cordoba'
      },
      pasatiempos: ['Comer', 'Dormir']
    });
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
