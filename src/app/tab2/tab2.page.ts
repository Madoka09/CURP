import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PersonaService } from '../../services/persona.service';
import { Persona } from 'src/app/models/Persona';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [PersonaService]
})
export class Tab2Page {
  persona: any = [];

  estados: any = [];
  charges: any = [];

  editPerson: any = {};
  constructor(private _personaService: PersonaService, public activatedRoute: ActivatedRoute,
              public loadingController: LoadingController, public router: Router) { }

  ngOnInit() {
    this.getEstados();
    this.persona = new Persona(1, '', '', '', '', '', '', '', null, null);
    this.activatedRoute.queryParams.subscribe((res) => {
      console.log(res);
      this.editPerson = res;
    });
    this.getCharges();
  }

  ionViewWillEnter() {
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

  async onSubmit(form) {
    const loading = await this.loadingController.create({
      message: 'Guardando Registro...'
    });
    await loading.present();
    this._personaService.create(this.persona).subscribe(
      async response => {
        console.log(response);
        this.persona = response.persona;
        await loading.dismiss();
        this.router.navigateByUrl('/tabs/tab1');
      }
    );
  }

  getEstados() {
    this._personaService.getEstados().subscribe(
      response => {
        this.estados = response;
        console.log(this.estados);
      }
    );
  }
}
