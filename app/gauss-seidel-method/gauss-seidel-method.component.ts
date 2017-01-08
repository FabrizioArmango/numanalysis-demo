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

      <h1>
        <span>
          <button (click)="onClick(matrixView.matrix, constantView.matrix, vectorView.matrix)">Calc</button>
        </span>
      </h1>

      <div 
        [class.centered-child]="true"
        [class.bold-text]="true"
        [hidden]="isNotValidMatrixSize()"
        *ngFor="let matrix of getMatrices(); let i = index" #tempCalcContainer>
        <br>
        <br>

          <h3>
            <span>
              {{getTitleOf(i)}}
            </span>
          </h3>
        <span>{{getDescOf(i)}}</span>

        <matrix-view [rows]="matrix.rows" [columns]="matrix.columns" [matrix]="matrix" [disabled]="true"> </matrix-view>
        
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

    solutionX: Array;

    M_inv: Matrix;

    Log(title: string, matrix: Matrix, description: string): void
    {
        this.loggingService.log(title, matrix, description);
    }

    getTitleOf(i): Array {
      return this.loggingService.logTitles[i];
    }

    getDescOf(i): Array {
      return this.loggingService.logDescriptions[i];
    }

    getMatrices(): Array {
      return this.loggingService.logMatrices;
    }

    constructor(private loggingService: MatrixPrint) {}

    onClick(matrix: Matrix, constantV: Matrix, vectorX: Matrix): void
    {
      this.algorithm(matrix, constantV, vectorX, 3);
    }

      
    algorithm(inputM: Matrix, inputV: Matrix, inputX: Matrix, iterations: number): void
    {
        this.solutionX = [];
        this.solutionX.push(inputX);

        let d: Matrix = new Matrix(inputV.rows, inputV.columns);
        let Bgs: Matrix = this.GetGaussSeidelMatrix(inputM);

        this.Log("Bgs Matrix", Bgs, "Matrice di Gauss Seidel");
        this.Log("Inverse of (D-B)", this.M_inv, " ");

        d = Matrix.CloneFrom(Matrix.Multiply(Bgs, inputV));
        this.Log("Vector d", d, " ");
        
        let iteration: number = 0;
        let solution: Matrix;
        while (iteration < iterations)
        {      
            solution = Matrix.Multiply(Bgs, this.solutionX[iteration]);
            solution = Matrix.SumBetween(solution, d);
            this.solutionX.push(solution);
            this.Log("X("+iteration+")", this.solutionX[iteration], " ");
            iteration++;
        }
        
    }   

    GetGaussSeidelMatrix(A: Matrix): Matrix
    {
        let D: Matrix = Matrix.DiagonalMatrixOf(A);
        let B: Matrix = Matrix.LowerMatrixOf(A, false);
        let C: Matrix = Matrix.UpperMatrixOf(A, false);
        
        this.Log("D Matrix", D, "...");
        this.Log("B Matrix", B, "...");
        this.Log("C Matrix", C, "...");
        // B*(-1)
        B.scalarMultiply(-1);
        this.Log("-B Matrix", B, "...");

        let M: Matrix = Matrix.SumBetween(D, B);
        console.debug("FINO A QUI TUTTO BENE 1");
        this.Log("M Matrix", M, "...");
        console.debug("FINO A QUI TUTTO BENE 10");

        this.M_inv = (M.rows == 2) ? M.inverse2x2() : GaussJordanInverseComponent.algorithm(M);
        console.debug("FINO A QUI TUTTO BENE 2");
        this.Log("M_inv Matrix", this.M_inv, "...");
        console.debug("FINO A QUI TUTTO BENE 3");
        let Bgs: Matrix = Matrix.Multiply(this.M_inv, C);

        console.debug("FINO A QUI TUTTO BENE 4");
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
}