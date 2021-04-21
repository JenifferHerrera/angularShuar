import { Component, OnInit } from '@angular/core';
import { Producto } from '../../class/producto';
import { ProductoService } from '../../services/producto.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-producto',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductoComponent implements OnInit {
  producto:any;
  productos: Producto[];
  public archivos: any=[];
  public previsualizacion: string;

  constructor(private dataService:ProductoService, private sanitizer: DomSanitizer) { 
    this.producto= new Producto();
  }

  ngOnInit(): void {
    this.getProductoData()
  }
  getProductoData(){
    this.dataService.getData().subscribe(res=>{
     this.productos=res as Producto[]});
  }
  addData(){
    console.log(this.producto)
    const data = new FormData();
    data.append('file', this.producto.foto)
    data.append('producto',JSON.stringify(this.producto));
    this.dataService.addData(data).subscribe(res=>{ 
      this.getProductoData();
      localStorage.setItem('producto_id', res['data'] ['id']) 
      console.log(res);
      console.log(res['msg']['summary']);
      
    }) 
  }
  deleteData(id:string){
    this.dataService.deleteData(id).subscribe(res=>{
    this.getProductoData();
    console.log(res) ;
    })
    this.getProductoData();
   }
   capturarFile(event):any{
     const archivoCapturado = event.target.files [0]
     this.producto.foto= archivoCapturado;
     this.extraerBase64(archivoCapturado).then((imagen: any) =>{
       this.previsualizacion=imagen.base;
       console.log(imagen)
     })
     this.archivos.push(archivoCapturado)
     //console.log(event.target.files);
   }
   extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })
}

