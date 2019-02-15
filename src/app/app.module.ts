import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// App is our top level component
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormPageComponent } from './form-page';
import { NoContentComponent } from './no-content';
import { CONSTANTS } from './shared/constants';
import { SERVICES } from './shared/services/';

// Application wide providers
const APP_PROVIDERS: any[] = [
    ...SERVICES,
    CONSTANTS,
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    FormPageComponent,
    NoContentComponent,
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    APP_PROVIDERS,
    { provide: 'CRYPTO-SECRET', useValue: 'SHF_43j%y?VWx$9+' },
  ]
})
export class AppModule { }
