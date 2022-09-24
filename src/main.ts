import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http'
import { environment } from './environments/environment.prod';
import { APP_ROUTES } from './app/app-routing.module';
import { RouterModule } from '@angular/router';


if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      BrowserModule,
      RouterModule.forRoot(APP_ROUTES)
    )]
}).catch(err => console.error(err));
