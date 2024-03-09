import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  public userGeo : [number, number] | undefined;
  get isUserLocationReady () :boolean{
     return !!this.userGeo
  }

  constructor() {

   }

   public async getUserLocation(): Promise<[number, number]>{
        return  new Promise((resolve, reject)=>{
                navigator.geolocation.getCurrentPosition(
                    ({coords})=>{
                         resolve([coords.latitude, coords.longitude])
                    },
                    (err)=>{
                        alert('No se pudo obtener la geolocalización')
                        console.log(err);
                        reject();
                    }
                )
        })
   }
}
