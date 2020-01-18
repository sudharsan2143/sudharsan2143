import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProduct, Product } from '../models/product';
import { max } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private AllEmployees:Array<Product> =  [
    {  id:1, name: 'Sudharsan', salery: '25000', designation: { name: 'Software Enginer', code: '1', category: 1 }, department: { name: 'CSE', code: '1', category: 0 }, experience: 100, deduction: 3 },

{  id:2, name: 'Karthik', salery: '35000', designation: { name: 'Software Enginer', code: '1', category: 1 }, department: { name: 'CSE', code: '1', category: 0 }, experience: 100, deduction: 7 },

{  id:3, name: 'David Warner', salery: '65000', designation: { name: 'Software Enginer', code: '1', category: 1 }, department: { name: 'CSE', code: '1', category: 0 }, experience: 100, deduction: 5 },

{  id:4, name: 'Virat Kohli', salery: '20000', designation: { name: 'Software Enginer', code: '1', category: 1 }, department: { name: 'CSE', code: '1', category: 0 }, experience: 100, deduction: 3 },

{  id:5, name: 'MS Dhoni', salery: '70000', designation: { name: 'Software Enginer', code: '1', category: 1 }, department: { name: 'CSE', code: '1', category: 0 }, experience: 100, deduction: 5 },

{  id:6, name: 'Yuvaraj', salery: '65200', designation: { name: 'Software Enginer', code: '1', category: 1 }, department: { name: 'CSE', code: '1', category: 0 }, experience: 100, deduction: 6 },

{  id:7, name: 'Dravid', salery: '36000', designation: { name: 'Software Enginer', code: '1', category: 1 }, department: { name: 'CSE', code: '1', category: 0 }, experience: 100, deduction: 8 },

{  id:8, name: 'Watson', salery: '52000', designation: { name: 'Software Enginer', code: '1', category: 1 }, department: { name: 'CSE', code: '1', category: 0 }, experience: 100, deduction: 12 },

{  id:9, name: 'Rahul', salery: '66300', designation: { name: 'Software Enginer', code: '1', category: 1 }, department: { name: 'CSE', code: '1', category: 0 }, experience: 100, deduction: 10 },

{  id:10, name: 'Thakur', salery: '30120', designation: { name: 'Software Enginer', code: '1', category: 1 }, department: { name: 'CSE', code: '1', category: 0 }, experience: 100, deduction: 10 },

{  id:11, name: 'Preveen Kumar', salery: '15000', designation: { name: 'Software Enginer', code: '1', category: 1 }, department: { name: 'CSE', code: '1', category: 0 }, experience: 100, deduction: 5 }
];

  constructor() { }

  getAllEmployees():Observable<IProduct[]>{
    return of(this.AllEmployees)
  }

  getProductById(id:number):Observable<IProduct>{
    var emps = this.AllEmployees.find(item => item.id === id);
    return of(emps);
  }

  addNewEmployees(emps:IProduct):void{
    this.AllEmployees.sort(item => item.id)
    emps.id = this.AllEmployees.length + 1
    this.AllEmployees.push(emps);
  }

  deleteEmployees(emps:IProduct):IProduct[]{
    const index = this.AllEmployees.findIndex(item => item.id === emps.id);
    const deletedItem = this.AllEmployees.splice(index,1);

    return deletedItem;
  }

  updateEmployees(emps:IProduct):void{

    const index = this.AllEmployees.findIndex(item => item.id === emps.id);
    this.AllEmployees[index] = emps;
  }

}