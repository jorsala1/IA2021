const express = require('express');

const app = express();

app.listen(3000, ()=>{
    console.log('levantado');
});


app.get('/', (req,res)=>{
    let url = req.url.toString().substring(2,req.url.length);
    let partes = url.split('&');
    let turno = partes[0].substring(6,partes[0].length);
    let estado = partes[1].substring(7,partes[1].length);
    

    if(turno == '1'){
        nextTurn = 1;
    }else{
        nextTurn = 2;
    }

    let cont = 0;
    let GameMatrixP = new Array(8);

        if(cont < 64){
            for(i = 0 ; i <= 7 ; i ++){
                GameMatrixP[i] = new Array(8);
                for( j =0 ; j <= 7 ; j ++){
                    if(estado.charAt(cont) == '2'){
                        GameMatrixP[i][j] = 0;
                    }else if(estado.charAt(cont) == '1'){
                        GameMatrixP[i][j] = 1;
                    }else{
                        GameMatrixP[i][j] = 2;
                    }                    
                    cont ++;
                }
                
            }
        }

    let Minimax = Minimax();

    ResolverJuego = ResolverJuego();
    
    let responseposition = SolveGame(GameMatrixP,nextTurn,3,ResolverJuego); 
      
    res.send(responseposition.x+''+responseposition.y);

});



//declaracion de la matriz con ponderaciones
function arrayValoresPonderados(){
    let x = 0;
    let y = 0;

    let matriz = new Array(8);
    for(x = 0; x<=7; x++){
        matriz[x] = new Array(8);
        for(y = 0; y <= 7; y++){
            if(x === 0 || x === 7){
                if(y === 0 || y === 7){
                    matriz[x][y] = 120;
                }else if(y === 1 || y === 6){
                    matriz[x][y] = -20;
                }else if(y === 2 || y === 5){
                    matriz[x][y] = 20;
                }else{
                    matriz[x][y]= 5;
                }
            }else if(x === 1 || x === 6){
                if(y === 0 || y === 7){
                    matriz[x][y] = -20;
                }else if(y === 1 || y === 6){
                    matriz[x][y] = -40;
                }else{
                    matriz[x][y]= -5;
                }
            }else if(x === 2 || x === 5){
                if(y === 0 || y === 7){
                    matriz[x][y] = 20;
                }else if(y === 1 || y === 6){
                    matriz[x][y] = -5;
                }else if(y === 2 || y === 5){
                    matriz[x][y] = 15;
                }else{
                    matriz[x][y]= 3;
                }
            }else{
                if(y === 0 || y === 7){
                    matriz[x][y] = 5;
                }else if(y === 1 || y === 6){
                    matriz[x][y] = -5;
                }else{
                    matriz[x][y]= 3;
                }
            } 
        }
    }
    
    return matriz;
}


//implementando algoritmo de Minimax
function SolveGame(GameMatrixP, TurnGame, pasosAdelantado, e){

        var fichasVisitados = 0;
        var mejorpuntPropia;
        var bestMovement = null; 
        var posiblesmovements = movementsPosibles(GameMatrixP, TurnGame);

        for (var positions = 0; positions < posiblesmovements.length; positions++) {
            var movement = posiblesmovements[positions];
            
            var nuevaFicha = NewMatrixGame(GameMatrixP, movement, TurnGame);
            
            var puntContrincante = Minimax(nuevaFicha, TurnGame, pasosAdelantado - 1, false, -2147483648, 2147483647, e);
            if (puntContrincante > mejorpuntPropia) {
                mejorpuntPropia = puntContrincante;
                bestMovement = movement;
            }
        }

        return bestMovement;
}


function movementsPosibles(GameMatrixP, TurnGame){

    var respuesta = new Array();

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (PuedeRealizarMovimientos(GameMatrixP, TurnGame, i, j)) {
                var NewPosition = { x: i, y: j };
                respuesta.push(NewPosition);
            }
        }
    }

    return respuesta;
}



function Minimax(ficha, contrincante, pasosAdelantado, valMaximo, alpha, beta, e){

    fichasExplorados++;
        
        if (pasosAdelantado == 0 ) {
            
            return e.ResolverJuego(ficha, contrincante);
        }

        var contrincanteColor = (contrincante == 1) ? 2 : 1;
        
        if ((valMaximo && !GameMatrixPTemp.hayAlgunmovement(ficha, contrincante)) || (!valMaximo && !this.GameMatrixPTemp.hayAlgunmovement(ficha, contrincanteColor))) {
            
            return this.Minimax(ficha, contrincante, pasosAdelantado - 1, !valMaximo, alpha, beta, e);
        }

        var puntPropia;

        if (valMaximo) {
            
            puntPropia;
           
            for (var positions = 0; positions < posiblesmovements.length; positions++) {
                var movement = posiblesmovements[positions];
                
                var nuevaFicha = GameMatrixPTemp.GameMatrixPMovilizar(ficha, movement, contrincante);
                
                var puntContrincante = Minimax(nuevaFicha, contrincante, pasosAdelantado - 1, false, alpha, beta, e);
                if (puntContrincante > puntPropia)
                    puntPropia = puntContrincante;
                
                if (puntPropia > alpha)
                    alpha = puntPropia;
                if (beta <= alpha)
                    break; 
            }
        }
        else {
            
            puntPropia;
            var posiblesmovements = posiblesmovements(ficha, contrincanteColor);
            for (var positions = 0; positions < posiblesmovements.length; positions++) {
                var movement = posiblesmovements[positions];
                
                
                var nuevaFicha;
                
                var puntContrincante = Minimax(nuevaFicha, contrincante, pasosAdelantado - 1, true, alpha, beta, e);
                if (puntContrincante < puntPropia)
                    puntPropia = puntContrincante;
                
                if (puntPropia < beta)
                    beta = puntPropia;
                if (beta <= alpha)
                    break; 
            }
        }
        return puntPropia;
}



function movementsPosibles(GameMatrixP, contrincante) {
    var respuesta = new Array();
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (PuedeRealizarMovimientos(GameMatrixP, contrincante, i, j)) {
                var NewPosition = { x: i, y: j };
                respuesta.push(NewPosition);
            }
        }
    }
    return respuesta;
}




function PuedeRealizarMovimientos(GameMatrixP, TurnGame, i, j){
    
    if (GameMatrixP[i][j] != 0)
            return false;

        var mi, mj, c;

        var TurnoContrincante = ((TurnGame == 1) ? 2 : 1);
        //mover hacia arriba
        mi = i - 1;
        mj = j;
        c = 0;
        while (mi > 0 && GameMatrixP[mi][mj] == TurnoContrincante) {
            mi--;
            c++;
        }

        if (mi >= 0 && GameMatrixP[mi][mj] == TurnGame && c > 0)
            return true;
        //mover hacia abajo
        mi = i + 1;
        mj = j;
        c = 0;

        while (mi < 7 && GameMatrixP[mi][mj] == TurnoContrincante) {
            mi++;
            c++;
        }

        if (mi <= 7 && GameMatrixP[mi][mj] == TurnGame && c > 0)
            return true;

        //mover hacia izquierda
        mi = i;
        mj = j - 1;
        c = 0;

        while (mj > 0 && GameMatrixP[mi][mj] == TurnoContrincante) {
            mj--;
            c++;
        }

        if (mj >= 0 && GameMatrixP[mi][mj] == TurnGame && c > 0)
            return true;
        //mover hacia derecha
        mi = i;
        mj = j + 1;
        c = 0;

        while (mj < 7 && GameMatrixP[mi][mj] == TurnoContrincante) {
            mj++;
            c++;
        }

        if (mj <= 7 && GameMatrixP[mi][mj] == TurnGame && c > 0)
            return true;

        //mover diagonal izquierda arriba
        mi = i - 1;
        mj = j - 1;
        c = 0;

        while (mi > 0 && mj > 0 && GameMatrixP[mi][mj] == TurnoContrincante) {
            mi--;
            mj--;
            c++;
        }

        if (mi >= 0 && mj >= 0 && GameMatrixP[mi][mj] == TurnGame && c > 0)
            return true;

        //mover diagonal arriba derecha
        mi = i - 1;
        mj = j + 1;
        c = 0;

        while (mi > 0 && mj < 7 && GameMatrixP[mi][mj] == TurnoContrincante) {
            mi--;
            mj++;
            c++;
        }

        if (mi >= 0 && mj <= 7 && GameMatrixP[mi][mj] == TurnGame && c > 0)
            return true;

        //mover diagonal abajo izquierda
        mi = i + 1;
        mj = j - 1;
        c = 0;

        while (mi < 7 && mj > 0 && GameMatrixP[mi][mj] == TurnoContrincante) {
            mi++;
            mj--;
            c++;
        }

        if (mi <= 7 && mj >= 0 && GameMatrixP[mi][mj] == TurnGame && c > 0)
            return true;

        //mover diagonail abajo derecha
        mi = i + 1;
        mj = j + 1;
        c = 0;

        while (mi < 7 && mj < 7 && GameMatrixP[mi][mj] == TurnoContrincante) {
            mi++;
            mj++;
            c++;
        }

        if (mi <= 7 && mj <= 7 && GameMatrixP[mi][mj] == TurnGame && c > 0)
            return true;

        //si fallan todas las direcciones
        return false;
}



function NewMatrixGame(GameMatrixP, movement, TurnGame){
    var NewMatrixGame = arrayValoresPonderados();
        for (var k = 0; k < 8; k++) {
            for (var l = 0; l < 8; l++) {
                NewMatrixGame[k][l] = GameMatrixP[k][l];
            }
        }


        //lugar de la pieza

        NewMatrixGame[movement.x][movement.y] = TurnGame;

        //piezas inversas

        var rev = inversePoints(NewMatrixGame, TurnGame, movement.x, movement.y);
        for (var positions = 0; positions < rev.length; positions++) {
            NewMatrixGame[rev[positions].x][rev[positions].y] = TurnGame;
        }
        return NewMatrixGame;
}



function inversePoints(GameMatrixP, GamePlayer, i, j) {
    var arrayInversoPuntos = [];
    var mi, mj, 
    var contrincante = ((GamePlayer == 1) ? 2 : 1);
    
    var mupts = [];
    mi = i - 1;
    mj = j;
    while (mi > 0 && GameMatrixP[mi][mj] == contrincante) {
        var nuevo = { x: mi, y: mj };
        mupts.push(nuevo);
        mi--;
    }
    if (mi >= 0 && GameMatrixP[mi][mj] == GamePlayer && mupts.length > 0) {
        for (var ii = 0; ii < mupts.length; ii++) {
            arrayInversoPuntos.push(mupts[ii]);
        }

    }

    return arrayInversoPuntos;
}