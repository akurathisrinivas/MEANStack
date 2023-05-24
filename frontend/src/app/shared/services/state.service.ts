import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  Url = environment.root;
  stateId: number;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
      private httpClient: HttpClient,
      ) {
        this.stateId = 0
       }
  
    addState(state: any) {
        // console.log('student',student);
         
     return this.httpClient.post(`${this.Url}/states`, state);
     }

     getState(){
      return this.httpClient.get(`${this.Url}/states`);
     }
     
     updateState(id: string, state: any){
       //console.log('state',state);
       
      return this.httpClient.patch(`${this.Url}/states/${id}`, state);

      
  } 

  getStateById(id: string) {
    return this.httpClient.get(`${this.Url}/states/${id}`);
  }

  deleteState(id: string) {
    return this.httpClient.delete(`${this.Url}/states/${id}`, { headers: this.headers });
  }

  setter(StateId: any) {
    this.stateId = StateId;
  }
  getter() {
    return this.stateId;
  }
}
