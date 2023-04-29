import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyfeedComponent } from './myfeed.component';

const routes: Routes = [{ path: '', component: MyfeedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyfeedRoutingModule { }
