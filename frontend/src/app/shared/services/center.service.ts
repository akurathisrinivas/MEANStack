import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CenterService {

    Url = environment.root;
    private headers = new HttpHeaders().set('Content-Type', 'application/json');
    centerId: number;
    constructor(
        private httpClient: HttpClient,
        ) {
          this.centerId = 0
         }

    getOrganisationsByState(stateId: string){

        return this.httpClient.get(`${this.Url}/organisations/getOrganisationsByState/${stateId}`);

    }

    addCenter(center: any){
        return this.httpClient.post(`${this.Url}/centers`, center);
    }
}

