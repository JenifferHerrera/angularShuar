import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
//import { RegistroComponent } from './vistaPrincipal/registro/registro.component';
//import { ProductoComponent } from './components/producto/producto.component';
import { ProductoEditComponent } from './components/producto-edit/producto-edit.component';
import { ProductoComponent } from './components/productos/productos.component';
import { RouterModule, Routes } from '@angular/router';
import { NabvarComponent } from './components/nabvar/nabvar.component';
const routes: Routes = [
  { path: 'producto', component:ProductoComponent }, 
  { path:'producto/edit/:id',component:ProductoEditComponent}, 
   
];


@NgModule({
  declarations: [
    AppComponent,
    //RegistroComponent,
    ProductoComponent,
    ProductoEditComponent,
    NabvarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
