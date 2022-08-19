import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/model/personas';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.component.html',
  styleUrls: ['./acercade.component.css']
})
export class AcercadeComponent implements OnInit {

  persona: persona = new persona("", "", "","", "");
  nombre:String = '';
  apellido:String ='';
  descripcion:String ='';
  img:String ='';
  titulo:String ='';
  editPersona: persona | undefined
  constructor(private personaService: PersonaService, private tokenService:TokenService) { }
  isLogged= false
  ngOnInit(): void {
    this.getPersona();
    if(this.tokenService.getToken()){
      this.isLogged= true;
    }else{
      this.isLogged = false;
    }

  }
  getPersona():void{
    this.personaService.getPersona().subscribe(data =>{
      this.persona = data;
     
    })
  }
  public onOpenModal(mode:String, persona?: persona):void {
    
    if (mode==='edit'){
      this.editPersona = persona;
      console.log(persona);
    }

  }
  onUpDatePersona(persona: persona){
    console.log(persona);
   
    this.personaService.upDatePersona(1, persona).subscribe(data=>{
      this.getPersona();
    }, err=>{
      alert("No se pudo editar la educación");
    });
  }
}
