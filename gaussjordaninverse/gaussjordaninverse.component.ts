import {Component, NgModule} from '@angular/core';
import { Matrix } from 'app/matrix/matrix';
@Component({
  selector: 'gauss-jordan-inverse',
  template:
    `
      Rows:<input type="number" [(ngModel)]="rows">
      Columns:<input type="number" [(ngModel)]="columns">
      <br>
      <br>
      <matrix-view [rows]="rows" [columns]="columns" #matrixView [hidden]="!(rows && columns && rows > 0 && columns > 0)"></matrix-view>
      <div *ngIf="!(rows && columns && rows > 0 && columns > 0)">
        Type valid # of rows and # of columns
      </div>
      <button (click)="onClick(matrixView.matrix)">Calc</button>

      <div *ngFor="let matrix of logMatrices; let i = index" #tempCalcContainer>
        <br>
        <br>
        <p>{{getTitleOf(i)}}</p>
        <matrix-view [rows]="matrix.rows" [columns]="matrix.columns" [matrix]="matrix" [disabled]="true"> </matrix-view>
        <span>{{getDescOf(i)}}</span>
      </div>
      <br>

    `
  //styleUrls: ['src/view/matrix-view/matrixview.css',
  //Columns:<input [(ngModel)]="columns">
})

export class GaussJordanInverseComponent
{
    rows: number;
    columns: number;

    logTitles: Array;
    logMatrices: Array;
    logDescriptions: Array;

    onClick(matrix): void
    {
      //console.debug("Ciaoo"+matrix[0][0]);
      this.algorithm(matrix);
    }

    algorithm(input: Matrix): void
		{
			// (A|I)
      this.logTitles = [];
      this.logMatrices = [];
      this.logDescriptions = [];

      var output: Matrix = Matrix.CloneFrom(Matrix.mergeHorizontally(input, Matrix.Identity(input.rows)));

			var L_i: Matrix;
			//Iterations:
      for (var it = 0; it < input.rows; it++)
			{
        console.log("it: "+it);
				if (this.isPivotNotZero(output, it))
				{
          console.log("computing L_i");
					L_i = this.gaussJordanLower(output, it);
          this.log("Lower"+it, L_i, "Triangolare inferiore");
					//trace("L_"+it+": "+L_i);
					//trace("A^"+it+"|I^"+it+this);

					output = Matrix.CloneFrom(Matrix.multiply(L_i, output));
          this.log("( A"+it+" | I"+it+" )", Matrix.CloneFrom(output), "Iterazione: "+it);
          //this.outputs.push(output);
				}
        // ADD PIVOT ZERO CASE
				//else
					//break Iterations;
				//trace("A^"+(it+1)+"|I^"+(it+1)+this);
			}

			// Divide rows by pivots
			for (var i = 0; i < output.rows; i++)
				output.rowProduct(i, 1/output.getAt(i,i));
      this.log("Output", output, "Dividing by pivots");
		}

    isPivotNotZero(input: Matrix, i: number): bool
		{
			return input.getAt(i, i) != 0;
		}

    gaussJordanLower(input: Matrix, j: number): Matrix
		{
			var lower: Matrix = Matrix.Identity(input.rows);

			// (m_ij) = (input_ij) / (input_jj)
			for (var i = 0; i < input.rows; i++)
				if (i != j)
				{
					lower.setAt(i, j, -input.getAt(i, j)/input.getAt(j, j));
				}
			return lower;
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
