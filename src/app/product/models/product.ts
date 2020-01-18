import { Lookup } from './lookup';
export interface IProduct{
    id:number;
    name:string;
    salery:string;
    designation:Lookup;
    department:Lookup;
    deduction:number;
    experience:number
}
export class Product {
    id:number;
    name:string;
    salery:string;
    designation:Lookup;
    department:Lookup;
    deduction:number;
    experience:number
    constructor(name?:string,salery?:string,designation?:Lookup,department?:Lookup,deduction?:number, experience?:number){
        this.name = name;
        this.salery = salery;
        this.designation = designation;
        this.department = department;
        this.deduction = deduction;
        this.experience = experience;
    }
}