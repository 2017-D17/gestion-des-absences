import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { LoginService } from './app/shared/service/login.service';

if (environment.production) {
  enableProdMode();
}

const init = () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
};

init();

