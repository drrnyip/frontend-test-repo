import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { RefillComponent } from './components/refill/refill.component';

// Services
import { MockServerService } from './services/mock-server.service';

// Routes
const appRoutes: Routes = [
  { path: 'operators', component: MainComponent },
  { path: 'refill/:operator', component: RefillComponent },
  { path: '', redirectTo: '/operators', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RefillComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' } ),
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MockServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
