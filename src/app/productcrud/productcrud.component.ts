import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
 
@Component({
  selector: 'app-productcrud',
  templateUrl: './productcrud.component.html',
  styleUrls: ['./productcrud.component.scss']
})
export class ProductcrudComponent {
 
  ProductArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
 
  productID: string ="";
  productname: string ="";
  category: string ="";
  categoryid:string = "";
 
  constructor(private http: HttpClient )
  {
    this.getAllProducts();
  }
 
  ngOnInit(): void {
  }
 
  getAllProducts()
  {
    this.http.get("http://localhost:8085/api/product")
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.ProductArray = resultData.data;
    });
  }
 
 
  
 
 
  register()
  {
   
    let bodyData = {
      "productID" : this.productID,
      "productname" : this.productname,
      "category" : this.category,
      "categoryid" : this.categoryid,
    };
 
    this.http.post("http://localhost:8085/api/products/add",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Product Added Successfully")
        this.getAllProducts();
      
    });
  }
 
  setUpdate(data: any)
  {
    this.productID = data.productID;
    this.productname = data.productname;
    this.category = data.category;
    this.categoryid = data.categoryid;
  
 
   
  }
 
  UpdateRecords()
  {
    let bodyData =
    {
      "productID" : this.productID,
      "productname" : this.productname,
      "category" : this.category,
      "categoryid" : this.categoryid,
    };
    
    this.http.put("http://localhost:8085/api/product/update"+ "/"+ this.productID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Product Updateddd")
        this.getAllProducts();
      
    });
  }
  save()
  {
    if(this.productID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }      
 
  }
 
 
  setDelete(data: any)
  {
    this.http.delete("http://localhost:8085/api/product/delete"+ "/"+ data.productID).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Product Deletedddd")
        this.getAllProducts();
    });
  }
}