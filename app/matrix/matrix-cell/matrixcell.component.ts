import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'matrix-cell',
  template:
  `
  <input [class.inputText]="true" type="text" [(ngModel)]="value" [disabled]="disabled">
  `,

  //styleUrls: ['src/view/matrix-view/matrixview.css',
  styleUrls: ['src/css/app.css']
})

export class MatrixCellComponent implements OnInit
{
  @Input() value: number;
  @Input() disabled: boolean;
  id: string;
}
