import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LivereModule } from './livere/livere.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    LivereModule.forRoot('MTAyMC8zMjQwNS84OTY2'),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
