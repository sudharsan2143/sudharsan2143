import { Injectable } from '@angular/core';
import { Lookup } from '../models/lookup';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  private units: Array<Lookup> =[
    {name:'SE', code:"1", category:1},
    {name:'UI', code:"2", category:1},
    {name:'Full Stack', code:"3", category:1},
    {name:'Java', code:"4", category:1}
  ];

  private productCategories:Array<Lookup> = [
    {name:'Software Enginer', code:"1", category:1},
    {name:'UI Developer', code:"2", category:1},
    {name:'Full Stack Developer', code:"3", category:1},
    {name:'Java Developer', code:"4", category:1}
  ];

  constructor() { }

  getProductCategories(): Observable<Lookup[]>{
    return of(this.productCategories);
  }

  getUnits():Observable<Lookup[]>{
    return of(this.units);
  }

}
