import { Component, OnInit } from '@angular/core';
import { ProductInfo } from 'src/app/Models/app.productInfo.model';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { HttpService } from 'src/app/Services/app.httpservice.service';
import { CommunicationService } from 'src/app/Services/app.communicationservice.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  products:Array<ProductInfo>;
  tableColumns:Array<string>;
  product:ProductInfo;
  showTable:boolean;
  showForm:boolean;
  frmProduct:FormGroup;
  UpdateClick:boolean;
  updateMessage:string;
  enterString:string;
  filteredTable:Array<ProductInfo>;

  constructor(private serv:HttpService , private com : CommunicationService) {
      this.products = Array<ProductInfo>();
      this.tableColumns = new Array<string>();
      this.product = new ProductInfo(0,'',1,100,'','','');
      this.showTable=false;
      this.showForm=false;
      this.UpdateClick=false;
      this.updateMessage = '';
      this.enterString = '';
      this.frmProduct = new FormGroup({
          'ProductId':new FormControl(this.product.ProductId, Validators.compose([Validators.required])),
          'ProductName':new FormControl(this.product.ProductName , Validators.compose([Validators.required]) ),
          'ProductRowId':new FormControl(this.product.ProductRowId),
          'BasePrice':new FormControl(this.product.BasePrice),
          'CategoryName':new FormControl(this.product.CategoryName),
          'Description':new FormControl(this.product.Description),
          'Manufacturer':new FormControl(this.product.Manufacturer)
      })
   }



  loadData(): void {
      this.showTable=true;
      console.log("LoadData is called");
      this.serv.getProducts().subscribe((resp) => {
          this.products = resp;
        //  console.log(JSON.stringify(resp));
      });
  }

  submitForm():void{
      let s = this.frmProduct.value;
      this.showForm=false;
      this.showTable=false;
      if(this.UpdateClick){
         
          this.update(s.ProductRowId , s);
      }
      else
      {
          this.save(s);
      }
      
  }

  loadForm():void{
      this.showForm=true;
      this.showTable=false;
      this.frmProduct.setValue(this.product);

  }
  ngOnInit(): void {
      for(let c in this.product){
          this.tableColumns.push(c);
        }

        this.com.onNameReceived.subscribe((name: string) => {
          console.log("subscribe"+name);
          this.enterString = name;
        })
   }
  save(s):void{
      //let prod = this.frmProduct.value;
      this.serv.postProduct(s).subscribe((resp)=>{
          console.log(JSON.stringify(s));
      })

  }
  
  updateForm(s:ProductInfo):void{
      this.UpdateClick=true;
      this.showForm=true;
      this.showTable=false;
      this.frmProduct.setValue(s);
     
  }
  

  update(id:number , prod:ProductInfo):void{
      this.updateMessage = 'Record is updated successfully..!' 
     this.serv.putProduct(id ,prod).subscribe((resp)=>{
          console.log(JSON.stringify(id));
      })
  }

  delete(ProductRowId:number){
      console.log("Delete is called" + ProductRowId);
      this.showTable=false;
      this.showForm=false;
      this.updateMessage = 'Record is Deleted successfully..!'

      this.serv.deleteProduct(ProductRowId).subscribe((resp)=>{
          console.log(JSON.stringify(ProductRowId));
      })
  }
  getSearchItem(str:string):void{
      console.log(str);
      this.com.receiveName(str);
  }
get FilteredTable(): Array<ProductInfo> {
  this.filteredTable = new Array<ProductInfo>();

  if(this.enterString != '') {
   
      this.filteredTable = this.products.filter((std,idx) => {
          
          return  (std.ProductId.toString().indexOf(this.enterString.toLowerCase()) !== -1)|| (std.ProductRowId.toString().indexOf(this.enterString.toLowerCase()) !== -1)
          ||(std.Description.toLowerCase().indexOf(this.enterString.toLowerCase()) !== -1)||(std.ProductName.toLowerCase().indexOf(this.enterString.toLowerCase()) !== -1)
          ||(std.CategoryName.toLowerCase().indexOf(this.enterString.toLowerCase()) !== -1)||(std.Manufacturer.toLowerCase().indexOf(this.enterString.toLowerCase()) !== -1)
          || (std.BasePrice.toString().indexOf(this.enterString.toLowerCase()) !== -1)
          });
      
  }else {
  
      this.filteredTable = this.products;
  }

  return this.filteredTable;
}


}
