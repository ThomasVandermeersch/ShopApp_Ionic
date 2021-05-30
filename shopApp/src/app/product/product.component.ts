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
    this.getProducts(); //Reload products in case of update of the API
}

  getProducts(){ //Get product from the API
      this.productService.getProductsFromServer().subscribe((resp=>{
      this.products = resp
      this.productService.products = resp
    }));
  }

  async showModal(id){  //A modal is a windows that opens in front plane when clicking on a product name.
                        // the modal contains the product details 
    const product = this.productService.getProduct(id)
    const modal = await this.modalCtrl.create({
      component: SingleProductComponent,
      // Content of the modal
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

  remove(id){ //remove a product
    this.productService.removeProduct(id).subscribe(async (resp)=>{
      this.getProducts()
    })
  }
}