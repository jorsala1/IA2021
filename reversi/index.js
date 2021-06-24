const express = require('express');

const app = express();

app.listen(3000, ()=>{
    console.log('levantado');
});

app.get('/', (req,res)=>{
    console.log(arrayValoresPonderados());
    res.send('Probando raiz');
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