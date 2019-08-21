import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from '../../services/persona.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapPage } from '../map/map.page';




@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  id: any = [];
  toShowInfo: any = [];
  personas: any = [];
  iterateInfo: any = [];

  location: any = [];
  constructor(public router: Router, private _personaService: PersonaService, public loadingController: LoadingController,
              private geolocation: Geolocation, public modalCtrl: ModalController) {}

  ngOnInit() {
    this.getId();
  }

  async getId() {
    const loading = await this.loadingController.create({
      message: 'Obteniendo IDs...'
    });
    await loading.present();
    this._personaService.getID().subscribe(
      response => {
        this.id = response;
        console.log(response);
      }, err => {
        console.log(err);
      }
    );
    await loading.dismiss();
    this.getPersonas();
  }

  async getPersonas() {
    const loading = await this.loadingController.create({
      message: 'Obteniendo Datos...'
    });
    await loading.present();
    this._personaService.getPersonas().subscribe(
      response => {
        this.personas = response;
        console.log(response);
      }, err => {
        console.log(err);
      }
    );
    await loading.dismiss();
  }

  async deleteId(id) {
    const loading = await this.loadingController.create({
      message: 'Borrando Datos'
    });
    await loading.present();
    this._personaService.deleteID(id).subscribe(
      response => {
        console.log(response);
      }, err => {
        console.log(err);
      }
    );
    await loading.dismiss();
    this.getId();
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.getId();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async saveLoc() {
    this.registerLoc();
    const loading = await this.loadingController.create({
      message: 'Guardando Ubicación'
    });
    await loading.present();
    this._personaService.setLocation(this.location).subscribe(
      response => {
        console.log(response);
      }, err => {
        console.log(err);
      }
    );
    await loading.dismiss();
  }

  registerLoc() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.location = {
        latitude: resp.coords.latitude,
        longitude: resp.coords.longitude
      };
      console.log(this.location);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  async presentModal(item) {
    const modal = await this.modalCtrl.create({
      component: MapPage,
      componentProps: { item }
    });
    return await modal.present();
  }


}
