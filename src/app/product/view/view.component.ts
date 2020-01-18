import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IProduct } from '../models/product';
import { ProductService } from '../service/employee.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  employee$:Observable<IProduct>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService:ProductService) { }

  ngOnInit() {

    this.employee$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
          this.productService.getProductById(Number.parseInt(params.get('id')))
        ));
    }

    editProduct(product):void{
      
      this.employee$.subscribe(product =>{
        //console.log('edit clicked');
        this.router.navigate(['products/edit/'+product.id]);
      });
  }
}