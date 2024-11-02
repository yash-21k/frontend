import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PdfGeneratorComponentComponent} from "./pdf-generator-component/pdf-generator-component.component";
import {AppComponent} from "./app.component";

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'pdf/:patientId', component: PdfGeneratorComponentComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
