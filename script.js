"use strict";

/*Creo la interfaz del cartón de bingo de manera dinámica*/
/*Serían en total 27 casilleros*/
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
	let x = 0; //Variable donde almacenamos valores aleatorios enteros.
	let n = 0; //Sirve para aumentar de 10 en 10 el rango de numeros que puede tomar "x" en cada columna "i", para una fila "j"
	//Con este doble for o for anidado, formamos una matriz de 9x3
	for (let i = 0; i < 9; i++) {
		//For i es para las columnas
		let col = []; //Creamos un array para cada columna
		for (let j = 0; j < 3; j++) {
			//For j es para las filas
			/*Tomo un valor "x" para columna "i". En cada columna
			aumento rango de números de 10 en 10 usando "n".*/
			if (j === 0) {
				x = Math.floor(Math.random()*10 + n);
				col[j] = x;
			}
			if (j > 0) {
				do {
					x = Math.floor(Math.random()*10 + n);
					col[j] = x;
				} while (searchRepeated(j, col)); //Si hay valores repetidos, entonces volvemos a generar un n° aleatorio X
			}

			if (j === 2) {
				col.sort(); //Ordenamos los valores de cada columna de menor a mayor
				matrix.push(col); //Añadimos una nueva columna a la matriz
				n += 10; //Aumentamos en 10  el rango de números de la próxima columna.
			}
		}		
	}
	console.log("Matrix: ", matrix);
	/*Una vez completada la matriz, rotamos la misma "90 grados" y la almacenamos en rotMatrix*/
	rotateMatrix("a"); 
	/*De esta forma se podrá recorrer la matriz a lo largo de la misma, de izquierda a derecha y
	determinar asi, de manera aleatoria, los 4 espacios vacíos que debe tener cada fila como condición*/

}

let rotMatrix = [[],[],[]];
let bool = true;
const rotateMatrix = (type) => {
	//En primer lugar, ingresamos a este if. Mas adelante necesitaremos volver a la matriz original (else)
	if (type === "a") { 
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 9; j++) {
				rotMatrix[i][j] = matrix[j][i];
			}	
		}	
		console.log("rotMatrix: ", rotMatrix);
		if (bool === true) {
			deleteNumbersX(); //Una vez cambiado los ejes, procedemos a ejecutar esta función
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
	}
}

//Ahora es for i para las filas y for j para las columnas
const deleteNumbersX = () => {
	let rPos; //Posición aleatoria que usará para generar espacios vacíos en cada fila
	for (let i = 0; i < 2; i++) {
		//For i para las filas.
		//Empezamos a trabajar primero con las filas 0 y 1.
		let rRef = []; 
		/*Creamos un array de referencia para guardar las posiciones anteriores y asi asegurarnos
		de que no se repita ninguna posicion*/
		for (let j = 0; j < 4; j++) {
			//For j para las columnas.
			/*Seleccionaremos solo 4 columnas, al azar, para cada fila, para cumplir asi con la
			condición del ejercicio*/
			if (j === 0) {
				/*Elegimos de forma aleatoria la primera columna para generarle un espacio vacío*/
				rPos = Math.floor(Math.random()*(rotMatrix[i].length));	//Columna aleatoria					
				rotMatrix[i][rPos] = ""; //Para una fila i y para una posición j aleatoria, tenemos "".
				rRef.push(rPos); //Almacenamos esta posición
			}
			if (j > 0) {
				//Para el resto de columnas: 1, 2 y 3 
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

