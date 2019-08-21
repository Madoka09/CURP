import { Component, ViewChild } from '@angular/core';
import { PersonaService } from '../../services/persona.service';
import { Persona } from 'src/app/models/persona';
import { NavController, ModalController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { EditPage } from '../edit/edit.page';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [PersonaService]
})
export class Tab1Page {

  estados: any = [];
  cuip: any = {};
  asignedSex: any;
  personas: any = [];
  id: any = [];
  constructor(private _personaService: PersonaService, public navCtrl: NavController, public router: Router,
    public modalCtrl: ModalController, public loadingController: LoadingController) { }

  ngOnInit() {
    this.getPersonas();
  }

  async getPersonas() {
    this.getEstados();
    const loading = await this.loadingController.create({
      message: 'Obteniendo Datos...'
    });
    await loading.present();
    this._personaService.getPersonas().subscribe(
      async response => {
        this.personas = response;
        console.log(response);
        console.log(this.personas);
        await loading.dismiss();
      }
    );
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.getPersonas();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  getEstados() {
    this._personaService.getEstados().subscribe(
      response => {
        this.estados = response;
        console.log(this.estados);
      }
    );
  }

  deletePersona(id) {
    this._personaService.delete(id).subscribe(
      response => {
      },
      error => {
        console.log(<any>error);
      }
    );
    this.getPersonas();
  }

  async presentModal(persona) {
    const modal = await this.modalCtrl.create({
      component: EditPage,
      componentProps: { persona }
    });
    return await modal.present();
  }

  generateId(persona) {
    this.getId(persona.id);
    console.log('id' + persona.id);
    console.log('control');
    console.log(this.id);
    if (persona.sexo === 'FEMENINO') {
      this.asignedSex = 'M';
    } else {
      this.asignedSex = 'H';
    }
    this.cuip = {
      clave: persona.lastname.charAt(0) + persona.lastname.charAt(1).toUpperCase() +
        persona.lastseconame.charAt(0) + persona.name.charAt(0) +
        persona.estado.charAt(0) + persona.nacimiento.charAt(2) +
        persona.nacimiento.charAt(3) + persona.nacimiento.charAt(5) +
        persona.nacimiento.charAt(6) + persona.nacimiento.charAt(8) +
        persona.nacimiento.charAt(9) + 'X' + this.asignedSex + persona.estado.charAt(0),
      persona_id: persona.id,
      nombre: persona.name,
      apellido: persona.lastname
    };
    if (this.id.length === 0) {
      console.log('Creating New Record...');
      this.saveId(this.cuip);
    } else {
      console.log('Exists, Updating...');
      this.updateId(persona.id);
    }
  }

  async updateId(id) {
    const loading = await this.loadingController.create({
      message: 'Generando Clave Unica...'
    });
    await loading.present();
    this._personaService.updateID(id, this.cuip).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    );
    await loading.dismiss();
  }

  async saveId(persona) {
    const loading = await this.loadingController.create({
      message: 'Generando Clave Unica...'
    });
    await loading.present();
    this._personaService.generateID(persona).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    );
    await loading.dismiss();
  }

  getId(id) {
    this._personaService.lookID(id).subscribe(
      response => {
        this.id = response;
        console.log(response);
      }, err => {
        console.log(err);
      }
    );
  }



  navigateId() {
    this.router.navigate(['/tabs/tab3'], { queryParams: this.cuip });
  }
}
