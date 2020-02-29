import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BtcComponent } from './components/coinOverview/btc/btc.component';
import { AppRoutingModule } from './app-routing.module';
import { StartComponent } from './components/start/start.component';

import { HttpClientModule } from '@angular/common/http'; 

import { ParticlesModule } from 'angular-particle';
import { ParticlesComponent } from './components/particles/particles.component';

@NgModule({
  declarations: [
    AppComponent,
    BtcComponent,
    StartComponent,
    ParticlesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ParticlesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
