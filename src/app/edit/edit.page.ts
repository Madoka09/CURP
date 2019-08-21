import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavParams, ModalController, LoadingController } from '@ionic/angular';
import { PersonaService } from '../../services/persona.service';
import { Persona } from 'src/app/models/Persona';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  public persona: Persona;

  //Variables viejas
  id: any;
  name: string;
  seconame: string;
  lastname: string;
  lastseconame: string;
  sexo: string;
  estado: string;
  nacimiento: any;

  //Variables nuevas
  nName: string;
  nSeconame: string;
  nLastname: string;
  nLastseconame: string;
  nSexo: string;
  nEstado: string;
  nNacimiento: any;

  newData: any = {};

  estados: any = [];

  constructor(public activatedRoute: ActivatedRoute, public navParams: NavParams, private _personaService: PersonaService, 
              public modalCtrl: ModalController, public loadingController: LoadingController) {
    console.log(navParams.get('persona'));
    this.persona = navParams.get('persona');
  }

  ngOnInit() {
    this.getEstados();
    this.id = this.persona.id;
    this.name = this.persona.name;
    this.seconame = this.persona.seconame;
    this.lastname = this.persona.lastname;
    this.lastseconame = this.persona.lastseconame;
    this.sexo = this.persona.sexo;
    this.estado = this.persona.estado;
    this.nacimiento = this.persona.nacimiento;
  }

  getNewParams() {
    this.nName = this.name ;
    this.nSeconame = this.seconame;
    this.nLastname = this.lastname;
    this.nLastseconame = this.lastseconame;
    this.nSexo = this.sexo;
    this.nEstado = this.estado;
    this.nNacimiento = this.nacimiento;

    //Crear nuevo json
    this.newData = {
      id: this.id,
      name: this.nName,
      seconame: this.nSeconame,
      lastname: this.nLastname,
      lastseconame: this.nLastseconame,
      sexo: this.nSexo,
      estado: this.nEstado,
      nacimiento: this.nNacimiento
    };

    console.log(this.newData);
  }

  async editPersona(id) {
    const loading = await this.loadingController.create({
      message: 'Guardando Datos...'
    });
    await loading.present();
    this.getNewParams();
    this._personaService.update(this.newData, id).subscribe(
      async response => {
        console.log(response);
        await loading.dismiss();
        this.dismiss();
      }
    );
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
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
