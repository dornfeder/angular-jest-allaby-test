import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environmentLoader as environmentLoaderPromise } from 'environments/environmentLoader';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

environmentLoaderPromise.then((env) => {
  environment.settings = { ...environment.settings, ...env };
  if (environment.settings.production) {
    enableProdMode();
  }

  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch((err) => console.error(err));

});
