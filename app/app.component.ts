import { Component }        from '@angular/core';
import { MatrixComponent }  from './matrix/matrix.component';
import { GaussJordanInverseComponent } from './gaussjordaninverse/gaussjordaninverse.component';

@Component
(
    {
        selector: 'numerical-analysis-demo',
        template:
        `
            <h1>{{title}}</h1>
            <h2>Algorithms</h2>
            <ul class="algorithms">
                <li *ngFor="let algorithm of algorithms"
                    [class.selected]="algorithm === selectedAlgorithm"
                    (click)="onSelect(algorithm)">
                    <span class="badge">{{algorithm.id}}</span> {{algorithm.name}}
                </li>
            </ul>
            <div *ngIf="selectedAlgorithm">
              <h2>{{selectedAlgorithm.name}} Demo</h2>

              <div [ngSwitch]="selectedAlgorithm.id">
                <ng-container *ngSwitchCase="1">
                    <gauss-jordan-inverse></gauss-jordan-inverse>
                </ng-container>
                <ng-container *ngSwitchDefault>
                    <label>Nessuna implementazione</label>
                </ng-container>
              </div>
            </div>

        `,
        styleUrls: ['src/css/app.css'],
        directives: [GaussJordanInverseComponent]
    }
)

export class NAComponent
{
    title = 'Numerical Analysis';
    algorithms = [{id: 1, name: 'GaussJordanInverse'}, {id: 2, name: 'DummyAlg'}];

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
