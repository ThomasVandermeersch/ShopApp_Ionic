import { Component,Input, OnInit } from '@angular/core';
import {ProductService} from '../services/product.service'
import { ActivatedRoute,Router } from "@angular/router";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})

export class ProductAddComponent implements OnInit {
  @Input() verbose = "Ajouter"

  product =  {
    name:"",
    url:"",
    price:0,
    description:""
  }

  productId = null;
  statusModify = false; // used to know is product is added or modified

  constructor(public service:ProductService,private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    // Check if it is a modification
    if(this.route.snapshot.queryParams.modify){
      this.productId = this.route.snapshot.queryParams.modify
      this.product = this.service.getProduct(this.productId)
      this.statusModify = true;
      this.verbose = "Modifier"
    }
  }

  addProduct(){ // Add product to the API
    if(!this.statusModify){
      console.log(this.product)
      this.service.addProduct(this.product).subscribe((result)=>{
        this.router.navigate(['/product'])
     })
    }
    else{ // Modify product of the API
      this.service.updateProduct(this.productId,this.product).subscribe((result)=>{
        this.router.navigate(['/product'])
      })
    }
  }
}
