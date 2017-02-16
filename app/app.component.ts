import { Component, ViewEncapsulation  }        from '@angular/core';
import { MatrixComponent }  from './matrix/matrix.component';
import { GaussJordanInverseComponent } from './gaussjordaninverse/gaussjordaninverse.component';
import { JacobiMethodComponent } from './jacobimethod/jacobimethod.component';
import { GaussSeidelComponent } from './gauss-seidel-method/gauss-seidel-method.component';
import { CholeskyMethodComponent } from './cholesky-method/cholesky-method.component';

@Component
(
    {
        selector: 'numerical-analysis-demo',
        template:
        `
            <h1><span>{{title}}</span></h1>
                <fieldset class="algorithmsList"> <h2>Algorithms</h2>
                    <fieldset class="algoListElement" *ngFor="let algorithm of algorithms"
                            (click)="onSelect(algorithm)">{{algorithm.name}}
                    </fieldset>
                </fieldset>
            <div>
                <fieldset class="algorithmsInput">
                    <div *ngIf="selectedAlgorithm">
                        <h2>{{selectedAlgorithm.name}} Demo</h2>

                        <div [ngSwitch]="selectedAlgorithm.id">
                            <ng-container *ngSwitchCase="1">
                                <gauss-jordan-inverse></gauss-jordan-inverse>
                            </ng-container>
                            <ng-container *ngSwitchCase="2">
                                <jacobi-method></jacobi-method>
                            </ng-container>
                            <ng-container *ngSwitchCase="3">
                                <gauss-seidel-method></gauss-seidel-method>
                            </ng-container>
                            <ng-container *ngSwitchCase="4">
                                <cholesky-method></cholesky-method>
                            </ng-container>                    
                            <ng-container *ngSwitchDefault>
                                <label>Nessuna implementazione</label>
                            </ng-container>
                        </div>
                    </div>
                </fieldset>
            </div>
        `,
        styleUrls: ['src/css/app.css'],
        directives: [ GaussJordanInverseComponent, JacobiMethodComponent ],
        encapsulation: ViewEncapsulation.None
    }
)

export class NAComponent
{
    title = 'Numerical Analysis';
    algorithms = [
        {id: 1, name: 'Gauss-Jordan Inverse'}, 
        {id: 2, name: 'Jacobi Method'},
        {id: 3, name: 'Gauss-Seidel'},
        {id: 4, name: 'Cholesky Method'}
    ];

    selectedAlgorithm = {};

    onSelect(algorithm: {id: '', name: ''}): void
    {
        this.selectedAlgorithm = algorithm;
    }
}
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/