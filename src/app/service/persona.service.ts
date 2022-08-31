import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { persona } from '../model/personas';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  URL = "https://backendyuli.herokuapp.com/personas/";

  constructor(private http: HttpClient) {} 

  public getPersona():Observable<persona>{
    return this.http.get<persona>(this.URL+'traer/perfil');
  }
  public upDatePersona(id: Number, persona: persona):Observable<persona>{
    return this.http.put<persona>(this.URL + `editar/${id}`,persona);
  }
}
