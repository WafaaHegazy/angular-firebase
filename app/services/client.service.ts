import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database-deprecated';
import {Observable} from 'rxjs';
import {Client} from '../models/Client'
@Injectable()
export class ClientService {
  clients :FirebaseListObservable <any[]>;
  client :FirebaseObjectObservable<any>;
  constructor(
    public af:AngularFireDatabase
  ) { 
   this.clients= this.af.list('/clients/clients') as FirebaseListObservable<Client[]>
  }
  getClients(){
    return this.clients;
  }
  addClient(client:Client){
    this.clients.push(client);
  }
  getClient(id:string){
    this.client= this.af.object('/clients/clients/'+id) as FirebaseObjectObservable<Client>;
    console.log(id)
    return this.client;
  }
  update(id:string , client:Client){
    return this.clients.update(id, client);
  }
  deleteClient(id:string){
    return this.clients.remove(id);
  }
}
