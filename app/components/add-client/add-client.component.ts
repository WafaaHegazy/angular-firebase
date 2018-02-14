import { Component, OnInit } from '@angular/core';
import {Client} from '../../models/Client';
import {FlashMessagesModule, FlashMessagesService} from 'angular2-flash-messages'
import { timeout } from 'rxjs/operator/timeout';
import { Router } from '@angular/router';
import {ClientService} from '../../services/client.service'
import {SettingsService} from '../../services/settings.service'
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
client :Client ={
  firstName : '',
  lastName: '',
  email: '',
  phone: '',
  balance: 0
};
disableBalace:boolean=true;
  constructor(
    public flashMessagesService:FlashMessagesService,
    public router: Router,
    public clientService:ClientService,
    public settingsService :SettingsService,

  ) { }
  
  ngOnInit() {
    this.disableBalace=this.settingsService.getSettings().disableBalanceOnAdd;
  }
onSubmit({value,valid}:{value:any,valid:boolean}){
  if(this.disableBalace){
    value.balance=0;
  }
  if(!valid){
    this.flashMessagesService.show("fill correct data",
    {cssClass:'alert-danger',timeout:4000});
    this.router.navigate(['add-client']);
  }else{
    this.clientService.addClient(value);
    this.flashMessagesService.show("new Client Added",
    {cssClass:'alert-success',timeout:4000});
    this.router.navigate(['/']);
  }
}
}
