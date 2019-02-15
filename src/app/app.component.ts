/**
 * Angular 2 decorators and services
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { Partners } from './shared/constants/partners';
import { UrlParamsService } from './shared/services/url';

export const ROOT_SELECTOR = 'app-root';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: ROOT_SELECTOR,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  public cssUrl?: SafeUrl;
  public partnerId?: number;
  public name = 'Angular Starter';

  constructor (
      private sanitizer: DomSanitizer,
      private urlParamsService: UrlParamsService,
      private partners: Partners
  ) {}

  public ngOnInit () {

    const getParamValue = parseInt(this.urlParamsService.get('partnerId'), 10);
    const targetPartner = this.partners.all.find((partner) => partner.id === getParamValue);
    this.partnerId = targetPartner ? targetPartner.id : this.partners.default;

    this.cssUrl = this.sanitizer
        .bypassSecurityTrustResourceUrl('assets/css/themes/partner_' + this.partnerId + '.css');
  }

}
