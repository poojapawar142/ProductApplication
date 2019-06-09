import { HttpService } from 'src/app/Services/app.httpservice.service';
import { CommunicationService } from 'src/app/Services/app.communicationservice.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductDetailsComponent } from './Component/product-details/product-details.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,HttpModule
    
  ],
  providers: [HttpService,CommunicationService],
  bootstrap: [ProductDetailsComponent]
})
export class AppModule { }
