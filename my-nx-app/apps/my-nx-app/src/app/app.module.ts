import { DataModule } from './../../../../libs/data/src/lib/data.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [AppComponent],
  imports:
  [
    BrowserModule,
    HttpClientModule,
    DataModule,
    FormsModule,
    NgbModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
