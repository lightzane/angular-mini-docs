import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TagsListComponent, TitleListComponent } from './components';
import { HeaderComponent } from './components/header/header.component';
import { PageListComponent } from './components/page-list/page-list.component';
import { PageComponent } from './components/page/page.component';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './pages';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BypassHtmlPipe } from './shared/pipes/bypass-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TitleListComponent,
    TagsListComponent,
    HeaderComponent,
    PageComponent,
    PageListComponent,
    PageNotFoundComponent,
    BypassHtmlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
