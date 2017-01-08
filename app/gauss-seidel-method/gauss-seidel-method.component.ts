import {Component, NgModule, EventEmitter} from '@angular/core';
import { GaussJordanInverseComponent } from 'app/gaussjordaninverse/gaussjordaninverse.component';
import { Matrix } from 'app/matrix/Matrix';
import { MatrixPrint } from 'app/matrix/matrixprint.service';

@Component({
  selector: 'gauss-seidel-method',
  template:
    `
      <div [class.centered-div]="true">
        <div *ngIf="isNotValidMatrixSize()">
          Type valid # of rows and # of columns
        </div>
        <div>
          <div [class.inline-block]="true">Rows:<br>
            <input  [class.inputText]="true" type="number" [(ngModel)]="rows">
          </div>
          <div [class.inline-block]="true">Columns:<br>
            <input  [class.inputText]="true" type="number" [(ngModel)]="columns">
          </div>

        </div>


          <br>

          <div
            [class.centered-child]="true"
            [class.bold-text]="true"
            [hidden]="isNotValidMatrixSize()">
          Matrix:
              <br>

              <matrix-view [rows]="rows" [columns]="columns" #matrixView></matrix-view>
          </div>
          <br>

          <div [class.centered-child]="true" [hidden]="isNotValidVectorSize()">
              <br>
              Constant terms
              <matrix-view [rows]="rows" [columns]="1" #constantView ></matrix-view>
              <br>
              Start Vector
              <matrix-view [rows]="rows" [columns]="1" #vectorView ></matrix-view>
          </div>
          <br>

      </div>
      <button (click)="onClick(matrixView.matrix, constantView.matrix, vectorView.matrix)">Calc</button>
      <div *ngFor="let matrix of getMatrices(); let i = index" #tempCalcContainer>
        <br>
        <br>
        <p>{{getTitleOf(i)}}</p>
        <matrix-view [rows]="matrix.rows" [columns]="matrix.columns" [matrix]="matrix" [disabled]="true"> </matrix-view>
        <span>{{getDescOf(i)}}</span>
      </div>
      <br>
    `,
  styleUrls: ['src/css/app.css'],
  providers: [ MatrixPrint ]
})

export class GaussSeidelComponent
{

    rows: number;
    columns: number;


    getTitleOf(i): Array {
      return this.loggingService.logTitles[i];
    }

    getDescOf(i): Array {
      return this.loggingService.logDescriptions[i];
    }

    getMatrices(): Array {
      return this.loggingService.logMatrices;
    }

    constructor(private loggingService: MatrixPrint) {

     }

    onClick(matrix: Matrix, constantV: Matrix, vectorX: Matrix): void
    {
      this.algorithm(matrix, constantV, vectorX, 3);
    }

      
    algorithm(inputM: Matrix, inputV: Matrix, inputX: Matrix, iterations: number): void
    {
        var Bgs: Matrix = this.GetGaussSeidelMatrix(inputM);
        this.Log("Bgs Matrix", Bgs, "Matrice di Gauss Seidel");
    }   

    GetGaussSeidelMatrix(A: Matrix): Matrix
    {
        let D: Matrix = Matrix.DiagonalMatrixOf(A);
        let B: Matrix = Matrix.LowerMatrixOf(A);
        let C: Matrix = Matrix.UpperMatrixOf(A);
        
        // B*(-1)
        for (var i: number = 0; i < B.rows; i++)
            B.rowProduct(i, -1);
        
        
        let M: Matrix = Matrix.SumBetween(D, B);

        this.Log("M Matrix", M, "...");
        let M_inv: Matrix = GaussJordanInverseComponent.algorithm(M);
        this.Log("M_inv Matrix", M_inv, "...");
        let Bgs: Matrix = Matrix.Multiply(M_inv, C);
        this.Log("Bgs Matrix", Bgs, "...");
        return Bgs;
    }
    /*
    static GetGaussSeidelIteration(A: Matrix, vectorX: Matrix, iteration: number): Matrix
    {
        var x_i = b[i][0] - (sum1*vectorX[j][0] + sum2*vectorX[][])
    }
    */
    isNotValidMatrixSize(): boolean
    {
      return !(this.rows && this.columns && this.rows > 0 && this.columns > 0);
    }

    isNotValidVectorSize(): boolean
    {
      return !((this.rows && this.columns) && (this.rows > 0));
    }

    createRange(number)
    {
      var items: number[] = [];
      for(var i = 1; i <= number; i++)
      {
         items.push(i);
      }
      return items;
    }

    Log(title: string, matrix: Matrix, description: string): void
    {
        this.loggingService.log(title, matrix, description);
    }
}