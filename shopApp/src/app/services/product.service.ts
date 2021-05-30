import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable } from 'rxjs';

//const endpoint = 'http://localhost:8000/api/' // endpoint to Symfony API
const endpoint = 'http://10.0.0.54:9000/api/' // endpoint to Node.Js Express API


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  isLoaded = false;
  products = []
  constructor(private http:HttpClient) { }


  //Search products in the database
  getProductsFromServer() {
    return this.http
      .get<any[]>(endpoint + 'product')
  }

  // Get a specific product from the product list. 
  getProduct(id){
    var product = null;
    this.products.forEach(elem =>{
      if(elem.id == id) product = elem
    })
    return product
  }

  getProductName(id){
    return this.getProduct(id)['name'] 
  }

  getProductPrice(id){
    return this.getProduct(id)['price'] 

  }

  addProduct(product): Observable<any>{ // Add product to the API
    return this.http.post(endpoint + 'product/new',product)
  }

  removeProduct(productId): Observable<any>{ // Remove product of the API
    return this.http.delete(endpoint + 'product/remove/'+productId)
  }

  updateProduct(productId, product): Observable<any>{ // Update products of the API
    return this.http.put(endpoint + 'product/modify/' + productId, product)
  }
}
