import { Component, OnInit } from '@angular/core';
import { ProductoService } from './../../services/producto.service';
import { Producto } from './../../class/producto';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.css']
})
export class ProductoEditComponent implements OnInit {
  id:any;
  data:any;
  producto = new Producto();

  constructor(private route:ActivatedRoute ,private dataService:ProductoService) { }

ngOnInit(): void {
    this.id=this.route.snapshot.params.id;
   this.getData(); 
   console.log(this.id);
  }
getData(){
    this.dataService.getProductoById(this.id).subscribe(res=>{
    this.data=res;
    this.producto=this.data;
  })}
updateProducto(){
    this.dataService.updateProductoData(this.id,this.producto).subscribe(resp=>{console.log(resp)})
  }
}
