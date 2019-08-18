import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {XxxCameraManagerModule} from '@app/modules/xxx-camera-manager/xxx-camera-manager.module';
import {XxxHeaderModule} from '@app/modules/xxx-header/xxx-header.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    XxxCameraManagerModule,
    XxxHeaderModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
