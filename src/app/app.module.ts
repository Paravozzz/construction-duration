import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ConstructionDurationModule} from "../construction-duration/construction-duration.module";
import {CoreModule} from "../core/core.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ConstructionDurationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
