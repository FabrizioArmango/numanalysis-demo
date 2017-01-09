import { Component } from '@angular/core'
import { Matrix } from 'app/matrix/Matrix';
@Component({

})

// status: PSEUDO CODE
export class GaussEliminationComponent 
{
    input: Matrix;

    algorithm(A: Matrix)
    {
        this.input = Matrix.CloneFrom(A);

        if (this.input.getAt(0,0) == 0)
            this.input.swapRows(0, this.input.maxInColumnIdx());
        
        for (let k: number = 0; k < this.input.rows; k++)
            for (let i: number = k+parseInt(1); i < this.input.rows; i++)
                this.input.sumMultipliedRowToRow(-mMulti(i, k), k, i);
    }

    mMulti(i: number, j: number): number
    {
        let m: number = this.input.getAt(i, j) / this.input.getAt(j, j)
    }
}