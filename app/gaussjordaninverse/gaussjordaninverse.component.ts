import {Component, NgModule} from '@angular/core';
import { Matrix } from 'app/matrix/Matrix';
@Component({
  selector: 'gauss-jordan-inverse',
  template:
    `
      <div>
        <div *ngIf="isNotValidMatrixSize()">
          Type valid # of rows and # of columns
        </div>
        <div [class.inline-block]="true">Rows:<br>
          <input  [class.inputText]="true" type="number" [(ngModel)]="rows">
        </div>
        <div [class.inline-block]="true">Columns:<br>
          <input  [class.inputText]="true" type="number" [(ngModel)]="columns">
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
      </div>

        <button (click)="onClick(matrixView.matrix)">Calc</button>

        <div
          [class.centered-child]="true"
          [class.bold-text]="true"
          [hidden]="isNotValidMatrixSize()" *ngFor="let matrix of logMatrices; let i = index" #tempCalcContainer>          
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

export class GaussJordanInverseComponent
{
    rows: number;
    columns: number;

    logTitles: Array;
    logMatrices: Array;
    logDescriptions: Array;

    onClick(matrix: Matrix): void
    {
      this.algorithm(matrix);
    }

    algorithm(input: Matrix): Matrix
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
				if (output.isPivotNotZero(it))
				{
          console.log("computing L_i");
					L_i = GaussJordanInverseComponent.GaussJordanLower(output, it);
          this.log("Lower"+it, L_i, "Triangolare inferiore");
					//trace("L_"+it+": "+L_i);
					//trace("A^"+it+"|I^"+it+this);

					output = Matrix.CloneFrom(Matrix.Multiply(L_i, output));
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

      output = output.copyMatrixFrom(0, parseInt(output.columns)/parseInt(2), output.rows, output.columns)
      this.log("Inverse", output, "Deleting Identity to left");
      return output;
		}

    static GaussJordanLower(input: Matrix, j: number): Matrix
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

    isNotValidMatrixSize(): boolean
    {
      return !(this.rows && this.columns && this.rows > 0 && this.columns > 0);
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

    static algorithm(input: Matrix): Matrix
		{
			// (A|I)
      var output: Matrix = Matrix.CloneFrom(Matrix.mergeHorizontally(input, Matrix.Identity(input.rows)));

			var L_i: Matrix;
			//Iterations:
      for (var it = 0; it < input.rows; it++)
			{
				if (output.isPivotNotZero(it))
				{
					L_i = GaussJordanInverseComponent.GaussJordanLower(output, it);
          output = Matrix.CloneFrom(Matrix.Multiply(L_i, output));
        }
        // ADD PIVOT ZERO CASE
				//else
					//break Iterations;
				//trace("A^"+(it+1)+"|I^"+(it+1)+this);
			}

			// Divide rows by pivots
			for (var i = 0; i < output.rows; i++)
				output.rowProduct(i, 1/output.getAt(i,i));

      output = output.copyMatrixFrom(0, parseInt(output.columns)/parseInt(2), output.rows, output.columns)

      return output;
		}
}