import { Component, ViewEncapsulation  }        from '@angular/core';
import { MatrixComponent }  from './matrix/matrix.component';
import { GaussJordanInverseComponent } from './gaussjordaninverse/gaussjordaninverse.component';
import { JacobiMethodComponent } from './jacobimethod/jacobimethod.component';
import { GaussSeidelComponent } from './gauss-seidel-method/gauss-seidel-method.component';


@Component
(
    {
        selector: 'numerical-analysis-demo',
        template:
        `
            <h1><span>{{title}}</span></h1>
            <div [class.centered-div]="true">
                <ul [class.centered-child]="true" class="algorithms"> <h2>Algorithms</h2>
                    <li *ngFor="let algorithm of algorithms"
                        [class.selected]="algorithm === selectedAlgorithm"
                        (click)="onSelect(algorithm)">
                        <span class="badge">{{algorithm.id}}</span> {{algorithm.name}}
                    </li>
                </ul>
            </div>
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
                <ng-container *ngSwitchDefault>
                    <label>Nessuna implementazione</label>
                </ng-container>
              </div>
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
        {id: 3, name: 'Gauss-Seidel'}
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