import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import {ClientService} from '../../services/client.service'
import {Client} from '../../models/Client'
import {FlashMessagesService} from 'angular2-flash-messages'
@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
id:string;
client:Client;
hasBalance:boolean=false;
showUpdate:boolean=false;
  constructor(
    public  route:ActivatedRoute,
    public router: Router,
    public clientService:ClientService,
    public flashMessagesService:FlashMessagesService
  ) {
   
   }

  ngOnInit() {
    this.id=this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe ( client=> {
      if(client.balance > 0){
        this.hasBalance=true;
      }
      this.client=client;
    
    });
    
  }
  updateBalance(id:string){
    this.showUpdate=false;
    this.clientService.update(this.id, this.client);
    this.flashMessagesService.show(" Client Balance Updated",
    {cssClass:'alert-success',timeout:4000});
    this.router.navigate(['/client/'+this.id]);
  }

  onDeleteClick(){
    if(confirm("are you sure you want to delete?")){
      this.clientService.deleteClient(this.id);
      this.flashMessagesService.show(" Client Deleted",
    {cssClass:'alert-success',timeout:4000});
    this.router.navigate(['/']);
    }
  }
}
