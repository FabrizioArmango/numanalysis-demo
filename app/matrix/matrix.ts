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
  getAt(i, j): number
  {
    return this.elements[i][j];
  }

  // Set value at position (i, j)
  setAt(i, j, value): void
  {
    //console.log("setAt("+i+", "+j+", "+value+")");
    this.elements[i][j] = value;
  }

  //  >  Other Operations
  // Multiply a row by a scalar
  rowProduct(row: number, scalar: number): void
	{
		for (var j = 0; j < this.columns; j++)
			this.setAt(row, j, parseFloat(this.getAt(row, j)) * scalar)
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

  //  >  Static Methods
  //
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
  static LowerMatrixOf(input: Matrix): Matrix
  {
    var lower: Matrix = Matrix.ZeroMatrix(input.rows);

    var j: number;

    for (var i: number = 0; i < input.rows; i++)
    {
      j = i;

      do
      {
        lower.setAt(i, j, input.getAt(i, j));
      } while (++j < input.columns);
    }

    return lower;
  }

  // Return Upper Matrix
  static UpperMatrixOf(input: Matrix): Matrix
  {
    var upper: Matrix = Matrix.ZeroMatrix(input.rows);

    var j: number;

    for (var i: number = 0; i < input.rows; i++)
    {
      j = 0;

      do
      {
        upper.setAt(i, j, input.getAt(i, j));
      } while (++j < input.rows);
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

  static mergeHorizontally(inputM1: Matrix, inputM2: Matrix): Matrix
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