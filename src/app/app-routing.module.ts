import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateFileComponent } from './create-file/create-file.component';
import { ViewFileComponent } from './view-file/view-file.component';
import { EditFileComponent } from './edit-file/edit-file.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  { path : '' , redirectTo : 'home', pathMatch : 'full'},
  { path : 'home' , component : HomeComponent },
  { path : 'createjson' , component : CreateFileComponent },
  { path : 'home/view-file/:nom' , component : ViewFileComponent },
  { path : 'home/view-file/:nom/edit-file/:nom' , component : EditFileComponent },
  { path : 'home/not-found' , component : NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
