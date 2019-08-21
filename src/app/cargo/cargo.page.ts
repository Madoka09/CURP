import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/services/persona.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.page.html',
  styleUrls: ['./cargo.page.scss'],
})
export class CargoPage implements OnInit {

  clave: any = {};
  request: any = [];
  charges: any = [];
  constructor(private _personaService: PersonaService, public loadingController: LoadingController) { }

  ngOnInit() {
    this.getCharges();
  }

  async getCharges() {
    const loading = await this.loadingController.create({
      message: 'Obteniendo Datos...'
    });
    await loading.present();
    this._personaService.getCharges().subscribe(
      response => {
        this.charges = response;
        console.log(response);
      }, err => {
        console.log(err);
      }
    );
    await loading.dismiss();
  }

  async add() {
    const loading = await this.loadingController.create({
      message: 'Añadiendo Registro...'
    });
    await loading.present();
    this._personaService.generateCharges(this.clave).subscribe(
      response => {
        console.log(response);
      }, err => {
        console.log(err);
      }
    );
    await loading.dismiss();
    this.getCharges();
  }

  async delete(id) {
    const loading = await this.loadingController.create({
      message: 'Borrando Campo...'
    });
    await loading.present();
    this._personaService.deleteCharges(id).subscribe(
      response => {
        console.log(response);
      }, err => {
        console.log(err);
      }
    );
    await loading.dismiss();
    this.getCharges();
  }

   doRefresh(event) {
    console.log('Begin async operation');
    this.getCharges();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }


}
