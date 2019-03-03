var canvas = document.getElementById("tetrisCanvas");
var contexto= canvas.getContext('2d');
let tablero=[]    //let para hacerla global
const FILAS=20;
const COLUMNAS=10;

//DEFINO UNA CONSTANTE DE TAMAÑO DE CUADRADO DEL TABLERO
const SQ=SQUARESIZE=38;
const VACIO="white";     // CUANDO UN CUADRADO DEL TABLERO ESTÁ VACÍO


/**
 Función para dibujar un cuadrado simple de 38*38px(SQ*SQ)
 x= número de SQ desde izquierda
 y=número de SQ desde la derecha
 color=color
*/
function drawSquare(x,y,color){
	contexto.fillStyle=color;
	contexto.fillRect(x*SQ,y*SQ,SQ,SQ);
	contexto.strokeStyle="black";
	contexto.strokeRect(x*SQ,y*SQ,SQ,SQ);
	
}

//tablero de alto=760 ancho=380
//piezas ===>alto=38  ancho=38





/********** TABLERO **********/
//Inicializo
for(i=0;i<FILAS;i++){
	tablero[i]=[];
	for(j=0;j<COLUMNAS;j++){
		tablero[i][j]=VACIO;
	}
}
//PINTO tablero
function drawTablero(){
	for(i=0;i<FILAS;i++){
		for(j=0;j<COLUMNAS;j++){
			drawSquare(j,i,tablero[i][j]);
		}
	}
}

drawTablero();


/************ PIEZAS ************/    // tetromino es cada pieza del tetris

const I = [
	[
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
	],
	[
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
	],
	[
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
	]
];

const J = [
	[
		[1, 0, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 1],
		[0, 1, 0],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[0, 0, 1]
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[1, 1, 0]
	]
];

const L = [
	[
		[0, 0, 1],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[1, 0, 0]
	],
	[
		[1, 1, 0],
		[0, 1, 0],
		[0, 1, 0]
	]
];

const O = [
	[
		[0, 0, 0, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 0, 0],
	]
];

const S = [
	[
		[0, 1, 1],
		[1, 1, 0],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 0, 1]
	],
	[
		[0, 0, 0],
		[0, 1, 1],
		[1, 1, 0]
	],
	[
		[1, 0, 0],
		[1, 1, 0],
		[0, 1, 0]
	]
];

const T = [
	[
		[0, 1, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 1, 0],
		[1, 1, 0],
		[0, 1, 0]
	]
];

const Z = [
	[
		[1, 1, 0],
		[0, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 0, 1],
		[0, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 1, 0],
		[1, 1, 0],
		[1, 0, 0]
	]
];







const PIEZAS = [
	[Z,"green"],
	[S,"red"],
	[T,"blue"],
	[O,"yellow"],
	[L,"cyan"],
	[I,"orange"],
	[J,"purple"]
];

//piezas aleatorias
function randomPieza(){
	var r = randomN = Math.floor(Math.random()*PIEZAS.length)// de 0 a 6
	return new Pieza(PIEZAS[r][0],PIEZAS[r][1]);
}

let p= randomPieza();

function Pieza(tetromino,color){
	this.tetromino=tetromino;
	this.color=color;
	
	this.tetrominoNum=0; // Elegimos el patrón por defecto de la pieza (0,1,2,3)
	this.activeTetromino= this.tetromino[this.tetrominoNum];
	
	//Con esto controlamos las piezas
	this.x=3;
	this.y=-2;
	console.log(this.activeTetromino.length);
}

Pieza.prototype.draw = function(){
	for(i=0;i<this.activeTetromino.length;i++){
		for(j=0;j<this.activeTetromino.length;j++){			
			if(this.activeTetromino[i][j]){
				drawSquare(this.x + j,this.y + i,this.color);
			}		
		}
	}
}
Pieza.prototype.undraw= function(){
	for(i=0;i<this.activeTetromino.length;i++){
		for(j=0;j<this.activeTetromino.length;j++){			
			if(this.activeTetromino[i][j]){
				drawSquare(this.x + j,this.y + i,VACIO);
			}		
		}
	}
}
p.draw();

/******** CONTROLES ***********/
Pieza.prototype.moverAbajo=function(){
	//Comprobamos primero si hay colisión
	if(!this.collision(0,1,this.activeTetromino)){
		this.undraw();
		this.y++;
		this.draw();
	}else{
		this.fijar();
		p= randomPieza();
		//parar pieza y generar una nueva
	}	
}

Pieza.prototype.moverDerecha=function(){
	//Comprobamos primero si hay colisión
	if(!this.collision(1,0,this.activeTetromino)){
		this.undraw();
		this.x++;
		this.draw();
	}else{
		//parar pieza y generar una nueva
	}
}

Pieza.prototype.moverIzquierda=function(){
	//Comprobamos primero si hay colisión
	if(!this.collision(-1,0,this.activeTetromino)){
		this.undraw();
		this.x--;
		this.draw();
	}else{
		//parar pieza y generar una nueva
	}
}

//Rotacion
Pieza.prototype.rotar=function(){
	//Comprobamos primero si hay colisión
	var siguienteRot=this.tetromino[(this.tetrominoNum+1)%this.tetromino.length];
	
	// si estamos en el borde y queremos rotar tenemos primero que empujar la pieza hacia un lado u otro y ya entonces rotarla
	var push=0;	
	if(this.collision(0,0,siguienteRot)){
		//limite de decisión de la mitad del tablero
		if(this.x>(COLUMNAS/2)){
			push=-1;
		}else{
			push=1;
		}
	}		
	if(!this.collision(push,0,siguienteRot)){
		this.undraw();
		this.x+=push;
		this.tetrominoNum=(this.tetrominoNum+1)%this.tetromino.length;  //Sacamos el resto de la división porque nuestras piezas van de 0 a 3. (0+1)%4 = 1
		this.activeTetromino=this.tetromino[this.tetrominoNum];
		this.draw();
	}else{
		//parar pieza y generar una nueva
	}
}

/***** ESCUCHADOR *****/
document.addEventListener("keydown",control);
function control(event){   //USAMOS AWSD 
	if(event.keyCode ==65){
		p.moverIzquierda();
	}
	if(event.keyCode ==87){
		p.rotar();
	}
	if(event.keyCode ==68){
		p.moverDerecha();
	}
	if(event.keyCode ==83){
		p.moverAbajo();
	}
}

// fijar pieza y eliminar fila completa
Pieza.prototype.fijar=function(){
	for(i=0;i<this.activeTetromino.length;i++){
		for(j=0;j<this.activeTetromino.length;j++){			
			if(!this.activeTetromino[i][j]){
				continue;
			}
			if(this.y+j<0){
				alert("Game Over");
				gameOver=true;
				break;
			}
			tablero[this.y+i][this.x+j]=this.color;
		}
	}
	//eliminar fila completa
	for(j=0;j<FILAS;j++){
		var filaLlena=true;
		for(i=0;i<COLUMNAS;i++){
			filaLlena=filaLlena && (tablero[j][i]!= VACIO);			
		}
		if(filaLlena){
			for(y=j;j>1;y--){
				for(i=0;i<COLUMNAS;i++){
					tablero[y][i]=tablero[y-1][i];
				}
			}
			//al bajar todas las filas una posición, la fila de arriba no tiene una fila sobre ella.
			for(c=0;c<COLUMNAS;c++){
				tablero[0][c]=VACIO;
			}
			
		}
	}
	//dibujamos el nuevo tablero
	drawTablero();
}



/***** COLISIONES ******/
//esta función devuelve TRUE si hay/va a haber colisión o FALSE si no
Pieza.prototype.collision = function(x,y,pieza){
	for(i=0;i<pieza.length;i++){
		for(j=0;j<pieza.length;j++){
			//Pasamos si está vacío
			if(!pieza[i][j]){
				continue;
			}
			//Obtenemos las coordenadas a futuro de la pieza, después del movimiento
			var nuevaX=this.x+j+x;
			var nuevaY=this.y+i+y;
			
			//comprobamos ciertas condiciones
			if(nuevaX<0 || nuevaX>=COLUMNAS || nuevaY>=FILAS){
				return true;
			}
			if(nuevaY < 0){
                continue;
            }
			//Comprobamos que no hay una pieza
			if(tablero[nuevaY][nuevaX]!=VACIO){
				return true;
			}
		}
	}
	return false;
}



//generamos una pieza cada segundo y la dejamos caer, se puede cambiar
var dropStart=Date.now();
let gameOver=false;
function drop(){
	//antes de entrar al método, capturo el tiempo y no dejo caer la pieza hasta que la diferencia con el nuevo "ahora" sea de al menos 1000ms(1 segundo)
	var ahora= Date.now();
	var delta= ahora-dropStart;
	if(delta>1000){
		p.moverAbajo();
		dropStart=Date.now();
	}	
	if(!gameOver){
		requestAnimationFrame(drop);
	}	
}

drop();


















