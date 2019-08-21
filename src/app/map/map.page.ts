import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  map: Map;
  lat: any;
  long: any;
  location: any = [];
  item: any;
  constructor(public modalCtrl: ModalController, public activatedRoute: ActivatedRoute, private geolocation: Geolocation,
    navParams: NavParams) {
      this.item = navParams.get('item');
      console.log(this.item);
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.registerLoc();
  }

  ionViewWillLeave() {
    this.map.remove();
  }

  leafletMap(lat, long) {
    // In setView add latLng and zoom
    this.map = new Map('mapId').setView([lat, long], 15);
    tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'edupala.com © ionic LeafLet',
    }).addTo(this.map);


    marker([lat, long]).addTo(this.map)
      .bindPopup(this.item.nombre + this.item.apellido + '<br>' + 'Clave: ' + this.item.clave)
      .openPopup();
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  registerLoc() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude,
        this.long = resp.coords.longitude;
      this.location = [this.lat, this.long];
      this.leafletMap(this.lat, this.long);
      console.log(this.location);
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

}
