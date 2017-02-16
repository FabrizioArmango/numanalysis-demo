import { Component } from '@angular/core'
import { Matrix } from 'app/matrix/Matrix';
import { MatrixPrint } from 'app/matrix/matrixprint.service';

@Component({
    selector: 'cholesky-method',
  template:
    `
      <div>
         <button (click)="switchSizeSpoilerVisibility()"> Size </button>
      </div>
      <div 
        #inputSizeSpoiler 
        [class.centered-div]="true">

        <div *ngIf="sizeSpoilerVisible()">
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

      </div>

      <h1>
        <span>
          <button 
            [hidden]="calcButtonHidden()"
            (click)="onClick(matrixView.matrix)">Calc</button>
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

// status: wip
export class CholeskyMethodComponent
{
    rows: number;
    columns: number;

    inputMatrix: Matrix; 
    matrixL: Matrix;

    getTitleOf(i): Array {
      return this.loggingService.logTitles[i];
    }

    getDescOf(i): Array {
      return this.loggingService.logDescriptions[i];
    }

    getMatrices(): Array {
      return this.loggingService.logMatrices;
    }

    _sizeSpoilerVisible: boolean = true;
    sizeSpoilerVisible(): Boolean
    {
      return this._sizeSpoilerVisible;
    }

    switchSizeSpoilerVisibility(): void
    {
      this._sizeSpoilerVisible = !this._sizeSpoilerVisible;
    }

    _calcButtonHidden: boolean = false;
    calcButtonHidden(): Boolean
    {
      return this._calcButtonHidden;
    }

    isNotValidMatrixSize(): boolean
    {
      return !(this.rows && this.columns && this.rows > 0 && this.columns > 0);
    }

    constructor(private loggingService: MatrixPrint) {}

    onClick(matrix: Matrix): void
    {
      this.algorithm(matrix);
    }

    algorithm(A: Matrix)
    {
        this.inputMatrix = Matrix.CloneFrom(A);

        this.matrixL = Matrix.ZeroMatrix(this.inputMatrix.rows);

        for (let j: number = 0; j < this.matrixL.rows; j++)
        {            
            for (let i: number = j; i < this.matrixL.rows; i++)
            {
                console.debug("CURR::i: "+i+", j: "+j);
                this.matrixL.setAt(i, j, this.calcElementOfL(i, j));
                
            }
        }
         this.Log("Output L", this.matrixL, "test");
    }

    calcElementOfL(i: number, j: number): number
    {
        let value: number = 0;
        console.debug("calcElementOfL("+i+", "+j+")");
        if (i == j)
            value = Math.sqrt(this.inputMatrix.getAt(j,j) - this.sumLQ(j) );
        else
        {
            value = this.inputMatrix.getAt(i,j) - this.sumLL(i, j);
            value /= this.matrixL.getAt(j, j);
        }
        return value;
    }

    sumLQ(j): number
    {
        let value = 0;
        for(let k=0; k < j; k++)
        {
            value += Math.pow(this.matrixL.getAt(j, k), 2);
            console.debug("sumLQ("+j+").value: "+value);
        }
        return value;
    }

    sumLL(i, j): number
    {
        let value = 0;
        for (let k=0; k<j; k++)
        {
            value += this.matrixL.getAt(i, k) * this.matrixL.getAt(j, k);
            console.debug("sumLL("+i+", "+j+").value: "+value);
        }
        return value;
    }

    Log(title: string, matrix: Matrix, description: string): void
    {
        this.loggingService.log(title, matrix, description);
    }

}