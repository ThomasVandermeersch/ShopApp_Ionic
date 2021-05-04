import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { compareTwoStrings} from 'string-similarity';
import {ModalController} from '@ionic/angular'
import {SingleProductComponent} from '../single-product/single-product.component'
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: any[];
  


  constructor(private productService : ProductService,private modalCtrl:ModalController) {}

  ngOnInit() {



    if(!this.productService.isLoaded){
      // this.productSubscription = this.productService.productSubject.subscribe(
      //   (products: any[]) => {
      //     this.products = products;
      //   }
      // );
      // this.productService.emitProductSubject();
      this.productService.getProductsFromServer().subscribe((resp=>{
        console.log(resp)
        this.products = resp
        this.productService.products = resp
        console.log(resp)
      }));
      this.productService.isLoaded = true;
    }
    else{
      this.products = this.productService.products;
    }

  }

  async showModal(id){        
    
    const product = this.productService.getProduct(id)
    console.log("Product")
    console.log(product)

    const modal = await this.modalCtrl.create({
      component: SingleProductComponent,
      componentProps:{
        productName: product.name,
        productDescription: product.description,
        productPrice: product.price,
        productUrl: product.url
      }

    })
    await modal.present();

  }

  filter(value){

    if(value==""){
      this.products = this.productService.products
    }
    else{
      value = value.toLowerCase()
      const filterList = []
      this.productService.products.forEach((product)=>{
        console.log(product.name)
        console.log(value)
        console.log(compareTwoStrings(product.name,value))
        if(  compareTwoStrings(product.name.toLowerCase(),value) >0.65){
          filterList.push(product)
        }
      })
      this.products = filterList
    }
  }

  clearFilter(){
    this.products = this.productService.products
  }

}