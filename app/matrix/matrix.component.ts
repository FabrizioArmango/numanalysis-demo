import { Component, Input, OnInit } from '@angular/core';
import { Matrix } from './Matrix';

@Component({
  selector: 'matrix-view',
  template:
  `
  <div>
    <span class="warningMsg" *ngIf="isNotValidMatrixSize()">Illegal size.</span>
    <table>
      <tr  *ngFor="let row of createRange(rows); let i = index">
          <td  *ngFor="let column of createRange(columns); let j = index">
              <matrix-cell (keyup)="updateMatrixValues(i, j, $event)" [value]="(this.matrix) ? this.matrix.getAt(i,j): ''" [disabled]="disabled"></matrix-cell>
              <br>
          </td>
      </tr>
    </table>
  <div>
  `,
  styleUrls: ['src/css/app.css']
})

export class MatrixComponent implements OnInit
{
    @Input() rows: number;
    @Input() columns: number;
    @Input('matrix') matrixInput: Matrix;
    @Input() disabled: boolean;


    ngOnChanges()
    {

      if (this.matrixInput === undefined)
      { /* not initialized */
        this.matrix = new Matrix(this.rows, this.columns);
        console.debug("Inizializza: "+this.matrix);
      } else
        this.matrix = this.matrixInput;
    }

    updateMatrixValues(i, j, event): void
    {
      var target = event.target || event.srcElement || event.currentTarget;
      var value = target.value;
      this.matrix.setAt(i, j, value);
    }

    createRange(number): number[]
    {
      var items: number[] = [];
      for(var i = 1; i <= number; i++)
      {
         items.push(i);
      }
      return items;
    }

    isNotValidMatrixSize(): boolean
    {
      return !(this.rows && this.columns && this.rows > 0 && this.columns > 0);
    }
}
