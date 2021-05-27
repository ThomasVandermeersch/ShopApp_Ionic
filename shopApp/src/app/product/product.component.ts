import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import {ModalController} from '@ionic/angular'
import {SingleProductComponent} from '../single-product/single-product.component'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: any[];
  
  constructor(private productService : ProductService,private modalCtrl:ModalController) {}

  ngOnInit() {
    this.getProducts()
  }

  ionViewWillEnter() {
    this.getProducts();
}

  getProducts(){
      this.productService.getProductsFromServer().subscribe((resp=>{
      this.products = resp
      this.productService.products = resp
    }));
  }

  async showModal(id){        
    const product = this.productService.getProduct(id)
    const modal = await this.modalCtrl.create({
      component: SingleProductComponent,
      componentProps:{
        productName: product.name,
        productDescription: product.description,
        productPrice: product.price,
        productUrl: product.url,
        productId:product.id
      }
    })
    await modal.present();
  }

  remove(id){
    this.productService.removeProduct(id).subscribe(async (resp)=>{
      this.getProducts()
    })
  }
}