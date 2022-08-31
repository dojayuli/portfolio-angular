import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/app/model/experience';
import { ExperienceService } from 'src/app/service/experience.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {


  experiencia: Experience[] = [];
  public editExperiencia: Experience | undefined;
  public deleteExperiencia: Experience |undefined;
  nombreExp: string = '';
  descripcionExp: string = '';
  exp: Experience | undefined;
  imgExperience: string ='';
 
  constructor(private servicioExperiencia: ExperienceService, private tokenService: TokenService) { }

  isLogged = false;
 
  ngOnInit(): void {
    this.cargarExperiencia();

    if(this.tokenService.getToken()){
      this.isLogged= true;
    }else{
      this.isLogged = false;
    }

  }

  public onOpenModal(mode:String, experiencia?: Experience):void {

     if(mode==='delete'){
      this.deleteExperiencia = experiencia;
   console.log(this.deleteExperiencia);
    }else if (mode==='edit'){

      this.editExperiencia = experiencia;

    }

  }

  cargarExperiencia():void{
    this.servicioExperiencia.lista().subscribe(data => {this.experiencia = data;})
  }

  onCreate(): void{
    const exp = new Experience(this.nombreExp, this.descripcionExp, this.imgExperience);
    this.servicioExperiencia.save(exp).subscribe(
      data =>{alert('Experiencia añadida');
      this.cargarExperiencia();
    }, err =>{ 
      alert('Falló');
    });
  }

  delete(id?: number){
    if(id != undefined){
      this.servicioExperiencia.delete(id).subscribe(data=>{
        this.cargarExperiencia();
      }, err =>{
        alert("No se pudo eliminar la experiencia");
      });
    }
  }

  onUpDateExperiencia(experience: Experience){

    this.servicioExperiencia.update(experience.id, experience).subscribe(data=>{
      this.cargarExperiencia();
    }, err=>{
      alert("No se pudo editar la experiencia");
    });
  }
}
