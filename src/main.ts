import { enableProdMode, importProvidersFrom, isDevMode } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http'
import { environment } from './environments/environment.prod';
import { APP_ROUTES } from './app/app-routing.module';
import { RouterModule } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';


if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule, BrowserModule, RouterModule.forRoot(APP_ROUTES)),
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    })
]
}).catch(err => console.error(err));
