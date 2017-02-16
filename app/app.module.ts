import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
/* App Root */
import { NAComponent }  from './app.component';

import { GaussJordanInverseComponent } from './gaussjordaninverse/gaussjordaninverse.component';
import { GaussSeidelComponent } from './gauss-seidel-method/gauss-seidel-method.component';
import { JacobiMethodComponent } from './jacobimethod/jacobimethod.component';
import { CholeskyMethodComponent } from './cholesky-method/cholesky-method.component';

import {MatrixComponent} from './matrix/Matrix.component';
import {MatrixCellComponent} from './matrix/matrix-cell/matrixcell.component';

@NgModule({
  imports:
  [
    BrowserModule, FormsModule
  ],
  declarations: [ NAComponent, GaussJordanInverseComponent, JacobiMethodComponent, GaussSeidelComponent,CholeskyMethodComponent, MatrixComponent, MatrixCellComponent],
  bootstrap:    [ NAComponent ]
})

export class AppModule { }

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
