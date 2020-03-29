import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BtcComponent } from './components/coinOverview/btc/btc.component';
import { AppRoutingModule } from './app-routing.module';
import { StartComponent } from './components/start/start.component';

import { HttpClientModule } from '@angular/common/http'; 

//Firebase
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';


import { ParticlesModule } from 'angular-particle';
import { ParticlesComponent } from './components/particles/particles.component';
import { ToastContainerComponent } from './components/toast-container/toast-container.component';
import { StatsContainerComponent } from './components/stats-container/stats-container.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartComponent } from './components/chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    BtcComponent,
    StartComponent,
    ParticlesComponent,
    ToastContainerComponent,
    StatsContainerComponent,
    AdminPageComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ParticlesModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
