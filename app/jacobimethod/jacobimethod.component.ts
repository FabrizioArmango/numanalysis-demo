import {Component, NgModule} from '@angular/core';
import { Matrix } from 'app/matrix/matrix';
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

          <div [class.centered-child]="true" [hidden]="isNotValidVectorSize()">Vector:
              <br>

              <matrix-view [rows]="rows" [columns]="1" #vectorView ></matrix-view>
          </div>
          <br>

      </div>
      <button (click)="onClick(matrixView.matrix, vectorView.matrix)">Calc</button>
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
  //Columns:<input [(ngModel)]="columns">
})

export class JacobiMethodComponent
{
    rows: number;
    columns: number;

    logTitles: Array;
    logMatrices: Array;
    logDescriptions: Array;

    onClick(matrix: Matrix, vector: Matrix): void
    {
      //console.debug("Ciaoo"+matrix[0][0]);
      this.logTitles = [];
      this.logMatrices = [];
      this.logDescriptions = [];

      this.log("vector", vector, "vector");

      this.algorithm(matrix, vector, 3);
    }

    algorithm(inputM: Matrix, inputV: Matrix, iterations: number): void
		{
			// (A|I)
      this.log("inputV", inputV, "inputV");
      /*
      this.logTitles = [];
      this.logMatrices = [];
      this.logDescriptions = [];
      */
      var M: Matrix = Matrix.DiagonalMatrixOf(inputM);
      var B: Matrix = Matrix.LowerMatrixOf(inputM);
      var C: Matrix = Matrix.UpperMatrixOf(inputM);
      var N: Matrix = Matrix.SumBetween(B, C);
      var MInv: Matrix = GaussJordanInverseComponent.algorithm(M);

      this.log("MInv", MInv, "Inversa con GaussJordan");

      var Bj: Matrix = Matrix.Multiply(MInv, N);
      this.log("Bj", Bj, "Jacobi Matrix");

      var dV: Matrix = new Matrix(inputM.columns, 1);

      console.log("prima della creazione del vettore d");
      for (var i: number = 0; i < dV.rows; i++)
      {
         console.log("\ri: "+i);
          console.log("\rv: "+inputV);
          console.log("\rinputM: "+inputM);
          console.log("\rinputV[ "+i+" ]: "+inputV.getAt(i, 0));
          var value: number = parseFloat(parseFloat(inputV.getAt(i, 0)) / parseFloat(inputM.getAt(i, i)));
          console.log("value: "+value);
          dV.setAt(i, 0, value);
      }
      this.log("dV", dV, "..");

      var outputV: Matrix = new Matrix(inputM.columns, 1);

      for (var i: number = 0; i < iterations; i++)
      {
        console.log("iterazione: "+i);
          outputV = Matrix.CloneFrom(Matrix.Multiply(Bj, outputV));
          this.log("Bj*vector", outputV, "iteration");
          outputV = Matrix.SumBetween(outputV, dV);
          this.log("Output", outputV, "iteration:"+parseInt(i)+parseInt(1));
      }

		}

    isNotValidMatrixSize(): boolean
    {
      return !(this.rows && this.columns && this.rows > 0 && this.columns > 0);
    }

    isNotValidVectorSize(): boolean
    {
      return !((this.rows && this.columns) && (this.rows > 0));
    }

    showToView(iteration: number, matrix: Matrix): void
    {
      tempCalcContainer.appendChild(this.tableMatrix[i][j]);
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
