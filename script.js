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

//let x; //Variable donde almacenamos valores aleatorios enteros.
//let n; //Sirve para aumentar de 10 en 10 el rango de numeros que puede tomar "x" en cada columna "j", para una fila "i"


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
	rotateMatrix("a");
}

let rotMatrix = [[],[],[]];
let bool = true;
const rotateMatrix = (type) => {
	if (type === "a") {
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 9; j++) {
				rotMatrix[i][j] = matrix[j][i];
			}	
		}	
		console.log("rotMatrix: ", rotMatrix);
		if (bool === true) {
			deleteNumbersX();
			bool = false;
		}
	}
	else {
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 3; j++) {
				matrix[i][j] = rotMatrix[j][i];
			}	
		}	
		console.log("Matrix: ", matrix);
		//deleteNumbersY();		
	}
}

const deleteNumbersX = () => {
	let rPos;
	for (let i = 0; i < 2; i++) {
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
			if (i === 1 && j === 3) {
				rotateMatrix("b");
				console.log("Matrix: ", matrix);
			}
		}
	}
	let list = [];
	let cEmpty = [];
	for (let m = 0; m < 9; m++) {
		if (matrix[m][0] !== "" && matrix[m][1] !== "" && cEmpty.length < 4) {
			matrix[m][2] = "";
			cEmpty.push("");
		}
		else if (matrix[m][0] === "" && matrix[m][1] === "") {
			matrix[m][2] = rotMatrix[2][m];
		}
		else {
			list.push(m);
		}
	}	
	console.log(list);
	console.log(cEmpty);

	let mPos;
	let mRef = [];
	for (let n = 0; n < list.length; n++) {
		if (n === 0 && cEmpty.length < 4) {
			mPos = Math.floor(Math.random()*(list.length));	
			matrix[list[mPos]][2] = "";
			mRef.push(mPos);
			cEmpty.push("");
		}
		if (n > 0 && cEmpty.length < 4) {
			do {
				mPos = Math.floor(Math.random()*(list.length));					
			} while (mRef.indexOf(mPos) !== -1);	
			matrix[list[mPos]][2] = "";
			mRef.push(mPos);
			cEmpty.push("");		
		}
	}

	console.log("rotMatrix: ", rotMatrix);

	playBingo();
}

const playBingo = () => {
	let selector = 0;
	const lockers = document.querySelectorAll(".bingoCard > .locker");
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