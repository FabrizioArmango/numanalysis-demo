export class Matrix
{
  /* Matrix Data Management */
  rows: number;
  columns: number;

  elements: number[][];

  // Matrix Constructor
  constructor(rows: number, columns: number)
  {
    this.rows = rows;
    this.columns = columns;
    this.instantiateMatrix();
  }

  // Matrix allocation
  instantiateMatrix()
  {
    this.elements = [];
    for (var i = 0; i < this.rows; i++)
      this.elements[i] = [];
  };

  //  >  Basic Operation
  // Return value at position (i, j)
  getAt(i: number, j: number): number
  {
    return this.elements[i][j];
  }

  // Set value at position (i, j)
  setAt(i: number, j: number, value): void
  {
    //console.log("setAt("+i+", "+j+", "+value+")");
    this.elements[i][j] = value;
  }

  // 
  maxInColumnIdx(i: number): number
  {
    let idx: number;
    let max: number = 0;

    let value: number;
    for (let j: number; j < this.columns; j++)
    {
      value = this.getAt(i, j);
      if (max < value)
      {
        max = value;
        idx = j;
      }
    }

    return idx;
  }

  // should be
  swapRows(i: number, j: number): void
  {
    let temp: Array<number>;
    temp = this.elements[i];
    this.elements[i] = this.elements[j];
    this.elements[j] = temp;
  }

  scalarMultiply (scalar: number): Matrix
  {
    for (var i: number = 0; i < this.rows; i++)
        this.rowProduct(i, scalar);
  }

  sumMultipliedRowToRow(multi: number, row: number, target: number)
  {
    for (let j: number = 0; j < this.columns; j++)
      this.setAt(target, j, this.getAt(target, j) + multi*this.getAt(row, j));
  }

  //  >  Other Operations
  // Multiply a row by a scalar
  rowProduct(row: number, scalar: number): void
	{
		for (var j = 0; j < this.columns; j++)
			this.setAt(row, j, this.getAt(row, j) * scalar)
	}

  isPivotNotZero(i: number): bool
  {
    return this.getAt(i, i) != 0;
  }

  copyMatrixFrom(i: number, j: number, maxI: number, maxJ: number): Matrix
  {
    var copied: Matrix = new Matrix(parseInt(maxI) - parseInt(i), parseInt(maxJ) - parseInt(j));

    var idx_i: number = 0;
    var idx_j: number;

    for(var k: number = i; k < maxI; k++)
    {
      idx_j = 0;
      for(var w: number = j; w < maxJ; w++)
      {
        copied.setAt(idx_i, idx_j, this.getAt(k, w));
        idx_j++;
      } idx_i++;
    }
    return copied;
  }

  inverse2x2(): Matrix
  {
    let inverse: Matrix = new Matrix (2, 2);
        inverse.setAt(0, 0, this.getAt(1, 1));
        inverse.setAt(0, 1, -this.getAt(0, 1));
        inverse.setAt(1, 0, -this.getAt(1, 0));
        inverse.setAt(1, 1, this.getAt(0, 0));
    let det: number = this.determinant2x2();
        inverse.scalarMultiply(1/det);
    return inverse;
  }


  //  >  Static Methods
  //

  determinant2x2(): number
  {
      return (this.getAt(0,0) * this.getAt(1,1)) - (this.getAt(0,1) * this.getAt(1,0));
  }

  // Clone the matrix passed as argument
  static CloneFrom(input: Matrix): Matrix
	{
    console.log("CloneFrom");
    var copy: Matrix = new Matrix(input.rows, input.columns);

		for (var i = 0; i < input.rows; i++)
			for (var j = 0; j < input.columns; j++)
      {
        copy.setAt(i, j, input.getAt(i, j));
      }
    console.log("cloned");
    return copy;
	}

  // Return Sum between two matrices
  static SumBetween(inputM1: Matrix, inputM2: Matrix): Matrix
  {
    var sum: Matrix = new Matrix(inputM1.rows, inputM1.columns);

    for (var i: number = 0; i < inputM1.rows; i++)
      for (var j: number = 0; j < inputM1.columns; j++)
        sum.setAt(i, j, parseFloat(inputM1.getAt(i, j)) + parseFloat(inputM2.getAt(i, j)));

    return sum;
  }

  // Return Lower Matrix
  static LowerMatrixOf(input: Matrix, withDiagonal: Boolean = true): Matrix
  {
    var lower: Matrix = Matrix.ZeroMatrix(input.rows);

    for (var j: number = 0; j < input.columns; j++)
      for (var i: number = (withDiagonal == true) ? j : j + parseInt(1); i < input.rows; i++)
      {
        console.log("i: "+i+", j: "+j+", value: "+input.getAt(i, j));
        lower.setAt(i, j, input.getAt(i, j));
      }
      
    return lower;
  }

  // Return Upper Matrix
  static UpperMatrixOf(input: Matrix, withDiagonal: Boolean = true): Matrix
  {
    var upper: Matrix = Matrix.ZeroMatrix(input.rows);

    var limitI: number;
    
    for (var j: number = 0; j < input.columns; j++)
    {
      limitI = (withDiagonal == true) ? (j + parseInt(1)) : j;
      for (var i: number = 0; i < limitI; i++)
      {
        console.log("i: "+i+", j: "+j);
        console.log("\r value: "+input.getAt(i, j));
        upper.setAt(i, j, input.getAt(i, j));
      }
    }
    return upper;
  }

  // Return Diagonal Matrix
  static DiagonalMatrixOf(input: Matrix): Matrix
  {
    var diagonal: Matrix = Matrix.ZeroMatrix(input.rows);

    for (var i = 0; i < input.rows; i++)
        diagonal.setAt(i, i, input.getAt(i, i));

    return diagonal;
  }

  // Return Identity Matrix
  static Identity(size: number): Matrix
	{
    console.log("Identity");
		var identity: Matrix = Matrix.ZeroMatrix(size);
		for (var i = 0; i < size; i++)
				identity.setAt(i, i, 1);
		return identity;
	}

  // Return Zero matrix
	static ZeroMatrix(size: number): Matrix
	{
    console.log("Zero");
		var zero: Matrix = new Matrix(size, size);
		for (var i = 0; i < size; i++)
			for (var j = 0; j < size; j++)
				zero.setAt(i, j, 0);
		return zero;
	}

  // Return product matrix
  static Multiply(inputM1: Matrix, inputM2: Matrix): Matrix
	{
    console.debug("inputM2.getAt("+0+", "+0+"): "+inputM2.getAt(0, 0));
	  var product: Matrix = new Matrix(inputM1.rows, inputM2.columns);
	  var sum: number = 0;
		for (var i: number = 0; i < inputM1.rows; i++)
			for (var j: number = 0; j < inputM2.columns; j++)
			{
			  for (var k: number = 0; k < inputM2.rows; k++)
        {
          console.debug("inputM2.getAt("+k+", "+j+"): "+inputM2.getAt(k, j));
			    sum = parseFloat(sum) + parseFloat(inputM1.getAt(i, k)) * parseFloat(inputM2.getAt(k, j));
        }
        console.debug("i: "+i+", j: "+j+", value:"+sum);
			  product.setAt(i, j, sum);
			  sum = 0;
			}
	  return product;
  }

  static MergeHorizontally(inputM1: Matrix, inputM2: Matrix): Matrix
	{
    console.log("Merge");
		var merged: Matrix = new Matrix(inputM1.rows, parseFloat(inputM1.columns) + parseFloat(inputM2.columns));
			  //merged.setAt(1, 5, 99);
		var i: number;
		var j: number;

		for (i = 0; i < inputM1.rows; i++)
			for (j = 0; j < inputM1.columns; j++)
				merged.setAt(i, j, inputM1.getAt(i, j));
		var k: number;
		var w: number;

		for (k = 0, i = 0; k < inputM2.rows; k++, i++)
		{
			j = parseFloat(inputM1.columns);
			for (w = 0; w < inputM2.columns; w++, j++)
				merged.setAt(i, j, inputM2.getAt(k, w));
		}

    console.log("Merged");
		return merged;
	}
}