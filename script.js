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
				x = Math.floor(Math.random()*10 + (n + 1));
				col[j] = x;
			}
			if (j > 0) {
				do {
					x = Math.floor(Math.random()*10 + (n + 1));
					col[j] = x;
				} while (searchRepeated(j, col)); 
				/*Si hay valores repetidos, entonces volvemos a generar un n° aleatorio X.
				De esta forma nos aseguramos que en cada columna no se repitan los valores.*/
			}

			if (j === 2) {
				col.sort(); //Ordenamos los valores de cada columna de menor a mayor
				matrix.push(col); //Añadimos una nueva columna a la matriz
				n += 10; //Aumentamos en 10  el rango de números de la próxima columna.
				/*Como ya nos aseguramos que los valores de cada columna son distintos entre sí
				y que los valores de fila también, entonces cumplimos la condición de que ningún
				número puede repetirse*/
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
				rotMatrix[i][j] = matrix[j][i]; //Rotación de 90° de la matriz
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
				matrix[i][j] = rotMatrix[j][i]; //Rotación de -90° de la matriz.
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
				/*Para el resto de columnas: 1, 2 y 3, 
				buscamos en el array de posiciones para verificar
				que la actual posición no sea repetida*/
				do {
					rPos = Math.floor(Math.random()*(rotMatrix[i].length));					
				} while (rRef.indexOf(rPos) !== -1);	

				//Una vez obtenia la posición, convertimos ese espacio en vacío.
				//... y asi sucesivamente hasta alcanzar j = 3, es decir, 4 espacios vacíos.
				rotMatrix[i][rPos] = "";
				rRef.push(rPos);			
			}
			if (i === 1 && j === 3) {
				/*En la ultima vuelta de este for anidado, rotamos nuevamente la matriz
				pero esta vez en "-90°*, es decir, volvemos a la matriz original, para utilizarla
				en el siguiente for.*/
				rotateMatrix("b");
				console.log("Matrix: ", matrix);
			}
		}
	}

	//En este for se trabajará con la tercera fila de la matriz.
	let list = [];//Array de posiciones que faltan convertir en espacios vacíos
	let cEmpty = []; //Array que será usado para almacenar todos los espacios vacíos asignados
	for (let m = 0; m < 9; m++) {
		//For m para las columnas
		/*Si nos posicionamos en una columna m, fila 3 y cuando miramos los dos casilleros de arriba
		vemos que estos NO estan vacíos, entonces por condición del ejercicio, este casillero debe contener
		un espacio vacío*/
		if (matrix[m][0] !== "" && matrix[m][1] !== "" && cEmpty.length < 4) {
			matrix[m][2] = ""; //Asignamos espacio vacío
			cEmpty.push(""); //Contamos los espacios vacíos
		}
		/*Si nos posicionamos en una columna m, fila 3 y cuando miramos los dos casilleros de arriba
		vemos que estos SI estan vacíos, entonces por condición del ejercicio, este casillero debe contener
		un espacio vacío*/
		else if (matrix[m][0] === "" && matrix[m][1] === "") {
			matrix[m][2] = rotMatrix[2][m]; //Mantenemos el valor del casillero
		}
		/*Si nos posicionamos en una columna m, fila 3 y cuando miramos los dos casilleros de arriba
		vemos que solo uno de ellos se encuentra vacío, entonces por condición del ejercicio, este casillero puede
		contener o un espacio vacío o un valor*/
		else {
			/*Las posiciones que pertenecen a este caso, las guardamos en un array "list"
			para luego trabajar con estos casilleros en particular (en el siguiente for)*/
			list.push(m);
		}
	}	
	console.log(list);
	console.log(cEmpty);

	/*Vamos a recorrer el array "list" para trabajar con las posiciones que nos faltan determinar*/
	let mPos; //Sirve para elegir las posiciones del array "list". Estas serán elegidas de forma aleatoria
	let mRef = []; //Array donde almacenaremos las posiciones que ya fueron modificadas.
	for (let n = 0; n < list.length; n++) {
		/*En n igual a cero nos aseguramos que la cantidad
		de espacios vacíos de la fila 3 no pase de 4*/
		if (n === 0 && cEmpty.length < 4) {
			//Elegimos una pos aleatoria del "list".
			//Este list nos devolvera la posición en la matriz (o la columna que debemos modificar todavia en la fila 3)
			mPos = Math.floor(Math.random()*(list.length));	
			matrix[list[mPos]][2] = ""; //Asignamos un espacio vacío en esa posición
			mRef.push(mPos);//Guardamos la posición como referencia.
			cEmpty.push(""); 
			//Luego agregamos "" a este array de espacios vacíos, para asi mantener un conteo y no pasarnos de 4
		}
		//Las condiciones son iguales que para el primer "n", a diferencia q acá avanzamos con el resto de las filas.
		if (n > 0 && cEmpty.length < 4) {
			do {
				mPos = Math.floor(Math.random()*(list.length));					
			} while (mRef.indexOf(mPos) !== -1); //Nos aseguramos de elegir una posición igual a las anteriores	
			matrix[list[mPos]][2] = "";
			mRef.push(mPos);
			cEmpty.push("");		
		}
		/*Repetimos el proceso hasta recorrer toda la lista de posiciones que faltaban modificar o
		hasta que la cantidad de espacios vacíos sean 4 en total.*/
	}

	console.log("rotMatrix: ", rotMatrix);

	//Ejecutamos la siguiente función para cargar los datos de la matriz en la interfaz que diseñamos inicialmente
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

