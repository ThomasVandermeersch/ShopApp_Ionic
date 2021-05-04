import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import {ModalController} from '@ionic/angular'


@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {
  
  @Input() productName: string;
  @Input() productPrice: number;
  @Input() productUrl: string;
  @Input() productId: string;
  @Input() productDescription: string;


  constructor(private service: ProductService,private modalCtrl:ModalController) { }

  ngOnInit(): void {
    console.log('Product URL : ' + this.productUrl )
  }
  async close(){
    await this.modalCtrl.dismiss();
  }



  remove(id){
    console.log("Remove : " + id)
    this.service.removeProduct(id).subscribe((resp)=>{
      console.log(resp)
    })
  }

  modify(id){
    console.log("Modify : " + id)
  }

}
