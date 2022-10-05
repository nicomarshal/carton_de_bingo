"use strict";

const bingoCard = document.querySelector(".bingoCard");

const createLockers = () => {
	const list = [];
	const fragment = document.createDocumentFragment();
	for (let j = 0; j < 27; j++) {
		const locker = document.createElement("DIV");
		locker.classList.add(`locker`, `locker-${j}`);

		fragment.appendChild(locker);
	}
	bingoCard.appendChild(fragment);
	generateMatrix();
}

let x; //Variable donde almacenamos valores aleatorios enteros.
let n; //Sirve para aumentar de 10 en 10 el rango de numeros que puede tomar "x" en cada columna "j", para una fila "i"


let matrix = [];
const generateMatrix = () => {
	let x = 0;
	let n = 0;
	let rPos;
	for (let i = 0; i < 9; i++) {
		//For i es para las columnas
		let col = [];
		for (let j = 0; j < 3; j++) {
			//For j es para las filas
			if (j === 0) {
				rPos = Math.floor(Math.random()*col.length);
				x = Math.floor(Math.random()*10 + n);
				col[j] = x;
			}
			if (j > 0) {
				do {
					rPos = Math.floor(Math.random()*col.length);
					x = Math.floor(Math.random()*10 + n);
					col[j] = x;
				} while (searchRepeated(j, col))
			}

			if (j === 2) {		
				matrix.push(col);
				n += 10;
			}
		}		
	}
	console.log("Matrix: ", matrix);
	rotateMatrix();
}

let rotMatrix = [[], [], []];
const rotateMatrix = () => {
	if (rotMatrix[0].length === 0) {
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 9; j++) {
				rotMatrix[i][j] = matrix[j][i];
			}	
		}	
		console.log("rotMatrix: ", rotMatrix);
		deleteNumbersX();
	}
	else {
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 3; j++) {
				matrix[i][j] = rotMatrix[j][i];
			}	
		}	
		console.log("Matrix: ", matrix);
		deleteNumbersY();		
	}
}

const deleteNumbersX = () => {
	let rPos;
	for (let i = 0; i < 3; i++) {
		let rRef = [];
		for (let j = 0; j < 4; j++) {
			if (j === 0) {
				rPos = Math.floor(Math.random()*(rotMatrix[i].length));						
				rotMatrix[i][rPos] = "";
				rRef.push(rPos);
			}
			if (j > 0) {
				do {
					rPos = Math.floor(Math.random()*(rotMatrix[i].length));					
				} while (rRef.indexOf(rPos) !== -1);	

				rotMatrix[i][rPos] = "";
				rRef.push(rPos);			
			}
		}
	}	
	console.log("rotMatrix: ", rotMatrix);
	rotateMatrix();
}

const deleteNumbersY = () => {
	let rPos;
	for (let i = 0; i < 9; i++) {
		//For i es para las columnas
		let rRef = [];
		let counterY = Math.floor(Math.random()*2 + 1); //Toma los valores 1 o 2.
		for (let j = 0; j < counterY; j++) {
			//For j es para las filas
			if (j === 0) {
				rPos = Math.floor(Math.random()*matrix[i].length);
				matrix[i][rPos] = "";
				rRef.push(rPos);	
			}

			if (j > 0) {
				do {
					rPos = Math.floor(Math.random()*(matrix[i].length));					
				} while (rRef.indexOf(rPos) !== -1);

				matrix[i][rPos] = "";
			}
		}		
	}
	console.log("Matrix: ", matrix);
	playBingo();	
}


/*const deleteNumbersY = () => {
	let rPos;
	let rRef;
	let rotMatrix = [[], [], []];
	for (let i = 0; i < 9; i++) {
		//For i es para las columnas
		let counterY = Math.floor(Math.random()*2 + 1); //Toma los valores 1 o 2.
		for (let j = 0; j < counterY; j++) {
			//For j es para las filas
			if (j === 0) {
				rPos = Math.floor(Math.random()*matrix[i].length);
				if (rotMatrix[rPos].length < 4) {
					matrix[i][rPos] = "";
					rotMatrix[rPos].push("");	
				}else {
					do {
						rRef = rPos;
						rPos = Math.floor(Math.random()*matrix[i].length);
					} while ((rPos === rRef) && (rotMatrix[rPos].length >= 4));	
					matrix[i][rPos] = "";
					rotMatrix[rPos].push("");									
				}
			}

			if (j > 0) {
				do {
					rRef = rPos;
					rPos = Math.floor(Math.random()*matrix[i].length);
				} while ((rPos === rRef) && (rotMatrix[rPos].length >= 4));


				matrix[i][rPos] = "";
				rotMatrix[rPos].push(matrix[i][rPos]);	
			}
		}		
	}
	console.log(rotMatrix);
	playBingo();	
}*/

/*const deleteNumbersY = () => {
	let rPos;
	let rRef;
	let row0 = [];
	let row1 = [];
	let row2 = [];
	for (let i = 0; i < 9; i++) {
		//For i es para las columnas
		let counterY = Math.floor(Math.random()*2);
		for (let j = 0; j < 3; j++) {
			//For j es para las filas
			if (j === 0) {
				rPos = Math.floor(Math.random()*matrix[i].length);
				if (rPos === 0 && row0.length < 4) {
					matrix[i][rPos] = "";
					row0.push(matrix[i][rPos]);	
				}
				if (rPos === 1 && row1.length < 4) {
					matrix[i][rPos] = "";
					row1.push(matrix[i][rPos]);	
				}
				if (rPos === 2 && row2.length < 4) {
					matrix[i][rPos] = "";
					row2.push(matrix[i][rPos]);	
				}
			}

			if (j > 0 && counterY < 1) {
				do {
					rRef = rPos;
					rPos = Math.floor(Math.random()*matrix[i].length);
				} while (rPos === rRef);

				if (rPos === 0 && row0.length < 4) {
					matrix[i][rPos] = "";
					row0.push(matrix[i][rPos]);	
				}
				if (rPos === 1 && row1.length < 4) {
					matrix[i][rPos] = "";
					row1.push(matrix[i][rPos]);	
				}
				if (rPos === 2 && row2.length < 4) {
					matrix[i][rPos] = "";
					row2.push(matrix[i][rPos]);	
				}

				counterY++;
			}
		}		
	}
	console.log(row0);
	console.log(row1);
	console.log(row2);
	playBingo();	
}*/

/*const deleteNumbersY = () => {
	let rPos;
	let rRef;
	//let counterX = Math.floor(Math.random()*4)
	for (let i = 0; i < 9; i++) {
		//For i es para las columnas
		let counterY = Math.floor(Math.random()*2);
		for (let j = 0; j < 3; j++) {
			//For j es para las filas
			if (j === 0) {
				rPos = Math.floor(Math.random()*matrix[i].length);
				matrix[i][rPos] = "";				
			}
			if (j > 0 && counterY < 1) {
				do {
					rRef = rPos;
					rPos = Math.floor(Math.random()*matrix[i].length);
				} while (rPos === rRef);
				matrix[i][rPos] = "";
				counterY++;
			}
		}		
	}
	playBingo();	
}*/

const playBingo = () => {
	let selector = 0;
	const lockers = document.querySelectorAll(".bingoCard > .locker");
	console.log(lockers);
	for (let i = 0; i < 9; i++) {
		//For i es para las columnas
		for (let j = 0; j < 3; j++) {
			//For j es para las filas
			if (selector < 27) {
				lockers[selector].textContent = matrix[i][j];
				selector++; 
			}
		}
	}
}



const searchRepeated = (j, col) => {
	return (col.lastIndexOf(col[j], col.length-2) !== -1)
}


createLockers();

			//La variable "x" debe ser random
			//Debe tomar 5 números por cada vuelta del for i 
			//Por cada vuelta del for j, el rango de n debe aumentar de 10 en 10
			//De esta forma, "x" tomaría los siguientes valores:
			//j = 0; 0 <= x < 10.
			//j = 1; 10 <= x < 20, y así sucesivamente hasta j = 9. 

			/*Tomo un valor "x" para columna "j". En cada columna
			aumento rango de números de 10 en 10 usando "n".*/