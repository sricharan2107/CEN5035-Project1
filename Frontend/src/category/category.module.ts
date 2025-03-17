import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryComponent } from './category.component';


@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    RouterModule 
  ],
  exports: [CategoryComponent]
})

export class CategoryComponentModule { }
