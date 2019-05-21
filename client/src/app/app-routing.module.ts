import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { FearureComponent } from './fearure/fearure.component';
import { PricingComponent } from './pricing/pricing.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"test",
    pathMatch:"full"
  },
  {
    path:"test",
    component:TestComponent
  },
  {
    path:"feature",
    component:FearureComponent
  },
  {
    path:"pricing",
    component:PricingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
