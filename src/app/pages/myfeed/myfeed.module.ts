import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyfeedRoutingModule } from './myfeed-routing.module';
import { MyfeedComponent } from './myfeed.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MyfeedComponent
  ],
  imports: [
    CommonModule,
    MyfeedRoutingModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MyfeedModule { }
