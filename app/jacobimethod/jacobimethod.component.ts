import {Component, NgModule} from '@angular/core';
import { Matrix } from 'app/matrix/Matrix';
import { GaussJordanInverseComponent } from 'app/gaussjordaninverse/gaussjordaninverse.component';
@Component({
  selector: 'jacobi-method',
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
      <div *ngFor="let matrix of logMatrices; let i = index" #tempCalcContainer>
        <br>
        <br>
        <p>{{getTitleOf(i)}}</p>
        <matrix-view [rows]="matrix.rows" [columns]="matrix.columns" [matrix]="matrix" [disabled]="true"> </matrix-view>
        <span>{{getDescOf(i)}}</span>
      </div>
      <br>
    `,
  styleUrls: ['src/css/app.css']
})

export class JacobiMethodComponent
{
    rows: number;
    columns: number;

    logTitles: Array;
    logMatrices: Array;
    logDescriptions: Array;

    onClick(matrix: Matrix, constantV: Matrix, vectorX: Matrix): void
    {
      this.logTitles = [];
      this.logMatrices = [];
      this.logDescriptions = [];

      this.algorithm(matrix, constantV, vectorX, 3);
    }

    
    algorithm(inputM: Matrix, inputV: Matrix, inputX: Matrix, iterations: number): void
		{
			// (A|I)
      /*
      this.logTitles = [];
      this.logMatrices = [];
      this.logDescriptions = [];
      */
      /*
      var M: Matrix = Matrix.DiagonalMatrixOf(inputM);
      var B: Matrix = Matrix.LowerMatrixOf(inputM);
      var C: Matrix = Matrix.UpperMatrixOf(inputM);
      var N: Matrix = Matrix.SumBetween(B, C);
      var MInv: Matrix = GaussJordanInverseComponent.algorithm(M);
      */
      //this.log("MInv", MInv, "Inversa con GaussJordan");

      var Bj: Matrix = JacobiMethodComponent.GetJacobiMatrix(inputM);
      this.log("Jacobi Matrix", Bj, "  ");

      var dV: Matrix = new Matrix(inputM.columns, 1);

      for (var i: number = 0; i < dV.rows; i++)
      {
        /*
          console.log("\ri: "+i);
          console.log("\rv: "+inputV);
          console.log("\rinputM: "+inputM);
          console.log("\rinputV[ "+i+" ]: "+inputV.getAt(i, 0));
        */
          var value: number = parseFloat(parseFloat(inputV.getAt(i, 0)) / parseFloat(inputM.getAt(i, i)));
          console.log("value: "+value);
          dV.setAt(i, 0, value);
      }
      this.log("Vector d", dV, " ");

      var outputV: Matrix = Matrix.CloneFrom(inputX);

      for (var i: number = 0; i < iterations; i++)
      {
          console.log("iterazione: "+i);
          outputV = Matrix.Multiply(Bj, outputV);
          outputV = Matrix.CloneFrom(outputV);
          outputV = Matrix.SumBetween(outputV, dV);
          this.log("x("+i+"):", outputV, "iteration:"+(i+parseInt(1)));
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

    /* should be useless
    showToView(iteration: number, matrix: Matrix): void
    {
      tempCalcContainer.appendChild(this.tableMatrix[i][j]);
    }*/

    createRange(number)
    {
      var items: number[] = [];
      for(var i = 1; i <= number; i++)
      {
         items.push(i);
      }
      return items;
    }

    getTitleOf(num: number): string
    {
      return this.logTitles[num];
    }

    getDescOf(num: number): string
    {
      return this.logDescriptions[num];
    }

    log(title: string, matrix: Matrix, description: string)
    {
      this.logTitles.push(title);
      this.logMatrices.push(matrix);
      this.logDescriptions.push(description);
    }
}