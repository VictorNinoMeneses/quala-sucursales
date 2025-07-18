import { bootstrapApplication } from '@angular/platform-browser';
import { LOCALE_ID, importProvidersFrom } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideNzI18n, es_ES } from 'ng-zorro-antd/i18n';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from 'app/interceptors/token.interceptor';

registerLocaleData(es);

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideNzI18n(es_ES),
    { provide: LOCALE_ID, useValue: 'es' },
    provideAnimations(),
    importProvidersFrom(
      NzButtonModule,
      NzInputModule,
      NzFormModule
    ),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
  ]
}).catch(err => console.error(err));