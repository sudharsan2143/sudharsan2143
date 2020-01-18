import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../service/employee.service';
import { LookupService } from '../service/lookup.service';
import { Product, IProduct } from '../models/product';
import { Observable, Subscription } from 'rxjs';
import { Lookup } from '../models/lookup';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  formSubmitted = false;
  employeeForm = this.fb.group({});
  units:Observable<Lookup[]>;
  categories:Observable<Lookup[]>;
  constructor(private fb:FormBuilder,
    private lookupService:LookupService,
    private productService:ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.employeeForm.addControl('id',new FormControl(''));
    this.employeeForm.addControl('name',new FormControl('',[Validators.required]));
    this.employeeForm.addControl('salery',new FormControl('',[Validators.required]));
    this.employeeForm.addControl('category',new FormControl('',[Validators.required]));
    this.employeeForm.addControl('unit',new FormControl('',[Validators.required]));
    this.employeeForm.addControl('deduction',new FormControl('',[Validators.required]));
    this.employeeForm.addControl('experience',new FormControl('',[Validators.required]));
    this.units = this.lookupService.getUnits();
    this.categories = this.lookupService.getProductCategories();

    const product$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
          this.productService.getProductById(Number.parseInt(params.get('id')))
        ));

        product$.subscribe(product=>{
          if(!isNullOrUndefined(product)){
            console.log(product);
            this.employeeForm.get('id').setValue(product.id);
            this.employeeForm.get('name').setValue(product.name);
            this.employeeForm.get('salery').setValue(product.salery);
            this.employeeForm.get('category').setValue(product.designation.code);
            this.employeeForm.get('unit').setValue(product.department.code);
            this.employeeForm.get('experience').setValue(product.experience);
            this.employeeForm.get('deduction').setValue(product.deduction);
          }
        })


  }

  save($event:any):void{

    this.formSubmitted = true;
    if(!this.employeeForm.valid){
      return;
    }

    this.saveProduct();
 
    // navigate back to products list
    this.router.navigate(['/products']);
  }

  saveAndContinue($event:any):void{
    this.formSubmitted = true;
    console.log(this.employeeForm.get('name').errors);
    if(!this.employeeForm.valid){
      return;
    }

    this.saveProduct();

  }

  saveProduct():void{
    const employees =new Product();
    // map data from form to product
    employees.id = this.employeeForm.get('id').value;
    employees.name = this.employeeForm.get('name').value;
    employees.salery = this.employeeForm.get('salery').value;
    employees.designation = this.getLookupObjFromCode(this.employeeForm.get('category').value);
    employees.department =  this.getLookupObjFromCode(this.employeeForm.get('unit').value);
    employees.deduction =  this.employeeForm.get('deduction').value;
    employees.experience = this.employeeForm.get('experience').value;

    // save to database
    if(employees.id == 0){
      this.productService.addNewEmployees(employees);}
      else {
        this.productService.updateEmployees(employees);
      }
  }
  getLookupObjFromCode(code:string):Lookup{
    var lookup:Lookup = null;
    const subscription = this.units.subscribe(lookups => {
      lookup  = lookups.find(item => item.code == code)
    })
    subscription.unsubscribe();
    return lookup;
  }

}
