import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import {ClientService} from '../../services/client.service'
import {Client} from '../../models/Client'
import {FlashMessagesService} from 'angular2-flash-messages'
import {SettingsService} from '../../services/settings.service'
@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id:string;
  client :Client ={
    firstName : '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  disableBalace:boolean=true;

  constructor(public  route:ActivatedRoute,
    public router: Router,
    public clientService:ClientService,
    public flashMessagesService:FlashMessagesService,
  public settingsService:SettingsService) { }

  ngOnInit() {
    this.id=this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe ( client=> {
      this.client=client;
    
    });
    this.disableBalace=this.settingsService.getSettings().disableBalanceOnEdit;
  }

onSubmit({value,valid}:{value:any,valid:boolean}){
  if(!valid){
    this.flashMessagesService.show("fill correct data",
    {cssClass:'alert-danger',timeout:4000});
    this.router.navigate(['/edit-client/'+this.id]);
  }else{
    this.clientService.update(this.id,value);
    this.flashMessagesService.show(" Client updated",
    {cssClass:'alert-success',timeout:4000});
    this.router.navigate(['/client/'+this.id]);
  }
}

}
