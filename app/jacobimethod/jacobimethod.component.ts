import {Component, NgModule} from '@angular/core';
import { Matrix } from 'app/matrix/Matrix';
import { GaussJordanInverseComponent } from 'app/gaussjordaninverse/gaussjordaninverse.component';
import { MatrixPrint } from 'app/matrix/matrixprint.service';

@Component({
  selector: 'jacobi-method',
  template:
    `
        <div *ngIf="isNotValidMatrixSize()">
          Type valid # of rows and # of columns
        </div>
        <div>
          <div class="inline-block">Rows:<br>
            <input  [class.inputText]="true" type="number" [(ngModel)]="rows">
          </div>
          <div class="inline-block">Columns:<br>
            <input  [class.inputText]="true" type="number" [(ngModel)]="columns">
          </div>
        </div>

        <div class="inline-block" [hidden]="isNotValidVectorSize()">
          Matrix:
            <matrix-view [rows]="rows" [columns]="columns" #matrixView></matrix-view>
        </div>
        <br>
        <div class="inline-block" [hidden]="isNotValidVectorSize()">
          <div [class.vector]="true">
            Constant terms
            <matrix-view [rows]="rows" [columns]="1" #constantView></matrix-view>
          </div>  
          <div [class.vector]="true">
            Start Vector
            <matrix-view [rows]="rows" [columns]="1" #vectorView></matrix-view>
          </div>  
        </div>

      <div class="calcButtonDiv">
        <button class="calcButton" 
          (click)="onClick(matrixView.matrix, constantView.matrix, vectorView.matrix)">
            Calc  
        </button>
      </div>

      
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

export class JacobiMethodComponent
{
    rows: number;
    columns: number;

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
      console.debug("Arrivo qua");
      this.algorithm(matrix, constantV, vectorX, 3);
    }

    
    algorithm(inputM: Matrix, inputV: Matrix, inputX: Matrix, iterations: number): void
		{
      var Bj: Matrix = JacobiMethodComponent.GetJacobiMatrix(inputM);
      this.Log("Jacobi Matrix", Bj, "  ");

      var dV: Matrix = new Matrix(inputM.columns, 1);

      for (var i: number = 0; i < dV.rows; i++)
      {
          var value: number = parseFloat(parseFloat(inputV.getAt(i, 0)) / parseFloat(inputM.getAt(i, i)));
          console.log("value: "+value);
          dV.setAt(i, 0, value);
      }
      this.Log("Vector d", dV, " ");

      var outputV: Matrix = Matrix.CloneFrom(inputX);

      for (var i: number = 0; i < iterations; i++)
      {
          console.log("iterazione: "+i);
          outputV = Matrix.Multiply(Bj, outputV);
          outputV = Matrix.CloneFrom(outputV);
          outputV = Matrix.SumBetween(outputV, dV);
          this.Log("x("+i+"):", outputV, "iteration:"+(i+parseInt(1)));
      }
		}

    static GetJacobiMatrix(A: Matrix): Matrix
    {
      var J: Matrix = new Matrix(A.rows, A.columns);

      for (var i: number = 0; i < A.rows; i++)
        for (var j: number = 0; j < A.columns; j++)
        {
          if (i==j)
            J.setAt(i, j, 0);
          else
            J.setAt(i, j, -A.getAt(i, j)/A.getAt(i, i));
        } 
      
      return J;
    }

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