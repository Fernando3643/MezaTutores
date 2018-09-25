import { Component, OnInit } from '@angular/core';
import { Conversation } from './conversation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  arrayData:Conversation[]=[];
  temporalData:Conversation=new Conversation();
  pushData:Conversation=new Conversation();
  
  training:boolean=false;
  disabledBot:boolean=true;
  disabledPerson:boolean=false;
  
  ngOnInit(){
    this.disabledPerson=false;
    this.disabledBot=true;
    this.training=true;
  }
  changeTypeGame(){
    if(this.training){
      this.disabledBot=true;
      this.disabledPerson=false;
    }
    console.log(this.training);
  }
  keyup(enterData: any){
    console.log(this.arrayData);
    if(this.training){
      if(enterData.key=="Enter"){
        if(this.disabledPerson==false){
          this.disabledPerson=true;
          this.disabledBot=false;
          this.pushData.inText=this.temporalData.inText;
          this.temporalData.inText="";          
        }else{
          this.disabledBot=true;
          this.disabledPerson=false;
          this.pushData.outText=this.temporalData.outText;
          this.temporalData.outText="";
          console.log("vamos a pushear: ");
          console.log(this.pushData)
          this.arrayData.push(this.pushData);
          this.pushData=new Conversation();
        }
      }
    }else{
      if(enterData.key=="Enter" ){
        this.pushData.inText = this.pushData.inText + " \n " + this.temporalData.inText;
        let find:boolean=false;
        for(let i=0; i<this.arrayData.length;i++){
           console.log(this.arrayData[i]);
           if(this.arrayData[i].inText==this.temporalData.inText){
             console.log("entrada ya conocida");
             this.temporalData.outText=this.arrayData[i].outText;
             this.pushData.outText=  this.pushData.outText + ' \n ' +this.arrayData[i].outText;
             this.temporalData.inText="";
             find=true;
           }
        }
        if(!find){
          this.pushData.outText="Sepa";
        }
        this.temporalData.inText = '';
      }
    }

   

  }

}
