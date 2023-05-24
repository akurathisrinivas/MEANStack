import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganisationsService {

    Url = environment.root;
    organisationId: number;
    private headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(
        private httpClient: HttpClient,
        ) {
          this.organisationId = 0
         }

         addOrganisations(organisation: any) {
            // console.log('student',student);
             
         return this.httpClient.post(`${this.Url}/organisations`, organisation);
         }
    
         getOrganisations(){
          return this.httpClient.get(`${this.Url}/organisations`);
         }

         updateOrganisations(id: string, organisation: any){
            //console.log('state',state);
            
           return this.httpClient.patch(`${this.Url}/organisations/${id}`, organisation);
        }

        getOrganisationById(id: string) {
            return this.httpClient.get(`${this.Url}/organisations/${id}`);
        }
        
        deleteOrganisation(id: string) {
            return this.httpClient.delete(`${this.Url}/organisations/${id}`, { headers: this.headers });
        }
        
        setter(StateId: any) {
            this.organisationId = StateId;
        }
        getter() {
            return this.organisationId;
        }

}