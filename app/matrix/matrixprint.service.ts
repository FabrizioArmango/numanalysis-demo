import { Injectable } from '@angular/core';

@Injectable()
export class MatrixPrint 
{

    logTitles: Array;
    logMatrices: Array;
    logDescriptions: Array;
    
    constructor() 
    {
        this.logTitles = [];
        this.logMatrices = [];
        this.logDescriptions = [];    
    }

    log(title: string, matrix: Matrix, description: string)
    {
        this.logTitles.push(title);
        this.logMatrices.push(matrix);
        this.logDescriptions.push(description);
    }

    getTitleOf(num: number): string
    {
        return this.logTitles[num];
    }

    getDescOf(num: number): string
    {
        return this.logDescriptions[num];
    }

}