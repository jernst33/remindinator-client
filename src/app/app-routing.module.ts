import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalendarPageComponent} from "./calendar-page/calendar-page/calendar-page.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path:'calendar-page', component: CalendarPageComponent},
  {path:'sign-up', component: SignUpComponent},
  {path:'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
