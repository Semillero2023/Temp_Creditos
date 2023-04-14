/*
---------------------------------------------------------------

                     VARIABLES A UTILIZAR
---------------------------------------------------------------                     
*/    
//Obtiene el cuerpo de la página
var canvas = document.getElementById("Cuerpo");
var ctx = canvas.getContext("2d");
//Pantalla completa
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//Arreglo de balas
var Balas = [];
var SuperBalas = [];
var BalasEnemigas = [];
//Arreglo de textos
var TextoCreditos0 = [
                      "EVELIO MARCOS JOSUÉ CRUZ SOLIZ",
                      "SANTIAGO JULIAN BARRERA REYES",
                      "JEFFREY OBED HURTARTE REVOLORIO",
                      "ELÍAS ABRAHAM VASQUEZ SOTO",
                      "MARIA DEL PILAR ZAVALA GALINDO",
                      "ESTUARDO BENJAMIN VASQUEZ LOPEZ",
                      "ERICK DANIEL RAMIREZ DIVAS",
                      "LYNDA ESTEFANY GABRIELA MORALES VELASQUEZ",
                      "DANILO ARTURO GIRÓN PANIAGUA" ,
                      "MARVIN STEVEN VALLE ORTIZ"
];
var TextoCreditos = [];
//Variables de uso general
var vivo = true;
var Posx = canvas.width / 2;
var Posy =  canvas.height -30 ;  
var xBala = Posx;
var yBala =  Posy - 30;  
var carga = 0;
var aumento = 1;
var combo = 0;
var Dificultad = 1;
var limiteX0 = 50;
var limiteXF = canvas.width - 100;
var PosLinea = 0;
var MarcoDireccion = "derecha";
//velocidades
var dx = 0;
var dy = -15;
var dxTextos = 5;
var dyTextos = 10;
var IncrementoFPS = 14;
var VelocidadX = 7;
var VelocidadY = 7;
var color = "#fff0f0f5";
//Controles 
var MoveDerecha = false;
var MoveIzquierda = false;
var MoveArriba = false;
var MoveAbajo = false;
var Disparar = false;
/*
---------------------------------------------------------------

                      La variable de fin de juego
---------------------------------------------------------------                     
*/ 
var FinJuego = false;
var derrota = true;
/*
---------------------------------------------------------------

                          MUSICA
---------------------------------------------------------------                     
*/    
document.addEventListener("keydown", ReproducirMusica, true);
const audio = new Audio("static/megalovania.mp3");
audio.loop = true;
audio.controls = true;
function ReproducirMusica (){
    audio.play();
}
/*
---------------------------------------------------------------

                  PANTALLA DE DERRORTA
---------------------------------------------------------------                     
*/    
function PantallaDerrorta(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    audio.pause();
    ctx.beginPath();
    ctx.rect(canvas.width * 0.1 ,canvas.height * 0.05, canvas.width * 0.8 , canvas.height * 0.9);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.font = "36px Consolas";
    ctx.fillText("UPS, MAS SUERTE PARA LA PROXIMA :(", canvas.width / 4  ,canvas.height /7);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.font = "20px Consolas";
    ctx.fillText("No importa cuantas veces caigas, lo importante es aprender a levantarse", canvas.width / 5 +10  ,canvas.height /7 +100);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.font = "20px Consolas";
    ctx.fillText("Recarga para volverlo a intentar o presiona atras para regresar a la biblioteca", canvas.width / 5 +10  ,canvas.height /7 +125);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.font = "36px Consolas";
    ctx.fillText("Grupo semillero promoción 2023", canvas.width /5 +10 ,canvas.height /6 +175);
    ctx.stroke();
    ctx.closePath();

    PosLinea = canvas.height /6 +175;

    TextoCreditos0.map((x) => {
    PosLinea += 30   
    ctx.beginPath();
    ctx.font = "20px Consolas";
    ctx.fillText(x, canvas.width / 5 +10 ,PosLinea);
    ctx.stroke();
    ctx.closePath();
    });
}

/*
---------------------------------------------------------------

                  PANTALLA DE VICTORIA
---------------------------------------------------------------                     
*/    
function PantallaVictoria(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    audio.pause();
    ctx.beginPath();
    ctx.rect(canvas.width * 0.1 ,canvas.height * 0.1, canvas.width * 0.8 , canvas.height * 0.8);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.font = "36px Consolas";
    ctx.fillText("ENHORABUENA, HAS TERMINADO EL JUEGO :D", canvas.width / 4  ,canvas.height /4);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.font = "30px Consolas";
    ctx.fillText("Si has llegado hasta aqui, sabes una cosa, asi como ganaste", canvas.width / 5 +10  ,canvas.height /4 +100);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.font = "30px Consolas";
    ctx.fillText(" este juego, te ira bien en lo que te propongas", canvas.width / 5 +10  ,canvas.height /4 +150);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.font = "30px Consolas";
    ctx.fillText("Recarga para volverlo a intentar", canvas.width / 5 +10  ,canvas.height /4 +300);
    ctx.fillText("o presiona atras para regresar a la biblioteca", canvas.width /5 +10 ,canvas.height /4 +350);
    ctx.stroke();
    ctx.closePath();
}
/*
---------------------------------------------------------------

                      CLASES
---------------------------------------------------------------                     
*/ 
//Clase balas
class BalaObjeto {
    constructor (yBala, xBala) {
        this.Cory = yBala;
        this.Corx = xBala;
        this.radio = 5;
        this.Bala = canvas.getContext("2d");
    }

}
//Clase texto
class CreditosTexto {
    constructor (texto,indice){
         this.texto = texto;
         this.indice = indice;
         this.direccion = "derecha";
         this.Corx = 25;
         this.Cory = 100 -200*indice;
         this.Sizex = texto.length*25 + 15*indice;
         this.Sizey = 50 + 5*indice;
         this.vida = 5 + 1.5*indice;
         if (indice == 0){
            this.visible = true;
         }
         else {
            this.visible = false;
         }
         this.Marco = canvas.getContext("2d");
    }
}
/*
---------------------------------------------------------------

                     CONTROLES
---------------------------------------------------------------                     
*/ 
//Listener del teclado para las direcciones
document.addEventListener("keydown", keyDownHandler, true);
document.addEventListener("keyup", keyUpHandler, true);
//Cmabiar los estados del teclado
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        MoveDerecha = true;
    }
    else if(e.keyCode == 37) {
        MoveIzquierda = true;
    }
    if(e.keyCode == 38) {
        MoveArriba = true;
    }
    else if(e.keyCode == 40) {
        MoveAbajo = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        MoveDerecha = false;
    }
    else if(e.keyCode == 37) {
        MoveIzquierda = false;
    }
    if(e.keyCode == 38) {
        MoveArriba = false;
    }
    else if(e.keyCode == 40) {
        MoveAbajo = false;
    }   
}
//Listener para las balas
document.addEventListener("keydown", SpacePresionado, true);
document.addEventListener("keyup", SpaceLiberado, true);

//Cmabiar los estados del teclado
function SpacePresionado(e) {
    if(e.keyCode == 32) {
        CargarSuperBala ();
    }
}
function SpaceLiberado(e) {
    if(e.keyCode == 32) {
        Disparar = false;
        aumento = 1;
        dibujarBalas();
    }
}
/*
---------------------------------------------------------------

               DIBUJADO DE TEXTO DE CREDITOS
---------------------------------------------------------------                     
*/ 
function DibujarTexto (){
    var i = 0;
    TextoCreditos0.map((x) => {
         CreditText = new CreditosTexto (x,i);
         TextoCreditos.push(CreditText);
         i += 1;
    });
}
function MostarTexto(){
    TextoCreditos.map((x) => {
        if (x.visible ){
            MoverTexto(x);
        }
    }
    );
}
function MoverTexto (x){
        x.Cory = 100 + 10*x.indice;
        if (x.Corx < canvas.width - x.Sizex && x.direccion == "derecha"){
            x.Corx += dxTextos+(1.25*x.indice);
        }
        else if (x.Corx >= canvas.width - x.Sizex) {
            x.direccion = "izquierda";
        }
        if (x.Corx > 50 && x.direccion == "izquierda"){
            x.Corx -= dxTextos+(1.25*x.indice);     
        }
        else if (x.Corx <= 50) {
            x.direccion = "derecha";
        }

        x.Marco.beginPath();
        x.Marco.rect(x.Corx,x.Cory,x.Sizex,x.Sizey);
        x.Marco.strokeStyle = "rgba(255, 255, 255, 0.5)";
        x.Marco.stroke();
        x.Marco.closePath();

        x.Marco.beginPath();
        x.Marco.font = (35+2*x.indice).toString()+"px Consolas";
        x.Marco.fillText(x.texto, x.Corx+25,x.Cory+40);
        x.Marco.stroke();
        x.Marco.closePath();


        //Recorre las balas de uno para ver si mató a alguno
        Balas.map((b) => {
            if (b.Cory <= x.Cory + x.Sizey && b.Cory>0  && b.Corx <= x.Corx + x.Sizex && b.Corx >= x.Corx){
                x.vida -= 1; 
                b.Corx = -100;
            }       
        });

        SuperBalas.map((sb) => {
            if (sb.Cory <= x.Cory + x.Sizey && sb.Cory>0&& sb.Corx <= x.Corx + x.Sizex && sb.Corx >= x.Corx){
                x.vida -= 5; 
                sb.Corx = -100; 
            }       
        });

        if (x.vida <= 0){
            Dificultad += 1;
            limiteX0 += 50;
            limiteXF -= 50;
            VelocidadX += 2;
            IncrementoFPS -= 1;
            //Cuando gana en el juego
            console.log(x.indice,TextoCreditos.length-1);
            if (x.indice==TextoCreditos.length-1){
                derrota = false;
                FinJuego = true;
            }
            x.visible = false;
            TextoCreditos[x.indice + 1].visible = true; 
            TextoCreditos[x.indice + 1].Cory = 25; 
        }
}

function DispararEnemigos (){
    TextoCreditos.map((x) => {
        if (x.visible ){
            DibujarBalasEnemigas (x.Corx + x.Sizex*0.5 ,x.Cory + x.Sizey );
        }
    }
    );
}
function VerificarVida(){
    BalasEnemigas.map((Be) => {
    //Calculo de la distancia, tomando como base el centro de cada bala en Corx|Cory + radio
    var distancia = Math.sqrt((Be.Corx-Posx)**2 + (Be.Cory-(Posy +25))**2);
    if (distancia <= Be.radio + 15){
        FinJuego = true;
    }   
});
}
/*
---------------------------------------------------------------

               DIBUJADO DE LAS BALAS Y SUPERBALAS
---------------------------------------------------------------                     
*/ 
function dibujarBalas(){
    NuevaBala = new BalaObjeto(yBala,xBala);
    Balas.push(NuevaBala);
}

function DibujarSuperBalas(){
if (combo > 0){
    NuevaBala = new BalaObjeto(yBala,xBala);
    SuperBalas.push(NuevaBala);
    combo -= 10;
}
}

function DibujarBalasEnemigas(x,y){
    NuevaBala = new BalaObjeto(y,x);
    BalasEnemigas.push(NuevaBala);
}

function MoverBalas (){
//Recorrer cada bala y moverla
Balas.map((x) => {
    if (x.Cory > -25){
        x.Corx += dx;
        x.Cory += dy;  
    }       
    x.Bala.beginPath();
    x.Bala.rect(x.Corx, x.Cory, 7.5, 10);
    x.Bala.fillStyle =  "#fffffff5" ;
    x.Bala.fill();
    x.Bala.closePath();
});
}

function MoverSuperBalas (){
//Recorrer cada bala y moverla
SuperBalas.map((x) => {
    if (x.Cory > -25){
        x.Corx += dx;
        x.Cory += 3*dy;  
    }    
    
    x.Bala.beginPath();
    x.Bala.arc(x.Corx, x.Cory, 40, 0, Math.PI*2, false);
    x.Bala.fillStyle = "#505c8957";
    x.Bala.fill();
    x.Bala.closePath();

    x.Bala.beginPath();
    x.Bala.arc(x.Corx, x.Cory, 30, 0, Math.PI*2, false);
    x.Bala.fillStyle = "#6e84d3bc";
    x.Bala.fill();
    x.Bala.closePath();

    x.Bala.beginPath();
    x.Bala.arc(x.Corx, x.Cory, 25, 0, Math.PI*2, false);
    x.Bala.fillStyle = "#6e98d3";
    x.Bala.fill();
    x.Bala.closePath();

    x.Bala.beginPath();
    x.Bala.arc(x.Corx, x.Cory, 20, 0, Math.PI*2, false);
    x.Bala.fillStyle = "#fffffff5";
    x.Bala.fill();
    x.Bala.closePath();

    
});
}
function CargarSuperBala (){
if (carga <= 200 && combo <= 0) {
    carga += aumento;
    aumento += 0.3;   
}
else if (carga >= 200){
    combo = 200;
    carga = 0;
}
}

function MoverBalasEnemigas (){
    //Recorrer cada bala y moverla
    BalasEnemigas.map((x) => {
        if (x.Cory < window.innerHeight + 1000){
            x.radio += (0.4*Dificultad);
            x.Corx += 0;
            x.Cory += 7+Dificultad;  
        }       
        x.Bala.beginPath();
        x.Bala.arc(x.Corx, x.Cory, x.radio, 0, Math.PI*2, false);
        //x.Bala.rect(x.Corx, x.Cory, 7.5, 10);
        x.Bala.fillStyle =  "#fffffff5" ;
        x.Bala.fill();
        x.Bala.closePath();
    });
    }

/*
---------------------------------------------------------------

                     DIBUJAR Y MOVER
---------------------------------------------------------------       
        
*/ 


//Comenzar a dibujar
function DibujarObjetos (){
    //Begin y closePath sirven para iniciar y finalizar el dibujado
    //Dibujo de un triangulo
    ctx.beginPath();
    ctx.fillStyle =  color ;
    ctx.moveTo(Posx, Posy-50);
    ctx.lineTo(Posx-30, Posy);
    ctx.lineTo(Posx+30, Posy);
    ctx.fill()
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(25, 50, carga, 25);
    ctx.fillStyle = "#fffffff5";
    ctx.fill();
    ctx.closePath();


    ctx.beginPath();
    ctx.rect(25, 50, 200, 25);
    ctx.fillStyle =  "#fffffff5" ;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(limiteX0, canvas.height / 2, limiteXF-limiteX0, canvas.height / 2 - 20);
    ctx.fillStyle =  "#fffffff5" ;
    ctx.strokeStyle = "rgba(255, 255, 255, 5)";
    ctx.stroke();
    ctx.closePath();

    MoverBalas();
    MoverBalasEnemigas();
    MoverSuperBalas();
    MostarTexto();
    VerificarVida();
}
/*
---------------------------------------------------------------

                       DIBUJO POR FOTOGRAMA
---------------------------------------------------------------                     
*/ 
function dibujar(){
    if (FinJuego == false){
            //Limpiar el lienzo
    ctx.clearRect(0,0,canvas.width,canvas.height);
    DibujarObjetos();
    //Escucha rel teclado
    //Si esta a la derecha
    if(MoveDerecha && Posx  < limiteXF - 50) {
        Posx += VelocidadX;
        xBala = Posx;
    }
    //Si está a la izquierda
    else if(MoveIzquierda && Posx  > limiteX0 + 50) {
        Posx -= VelocidadX;
        xBala = Posx;
    }
    //Si se mueve arriba o abajo
    if(MoveArriba && Posy  >=  canvas.height / 2 + 50) {
        Posy -= VelocidadY;
        yBala =Posy;
    }
    //Si está a la izquierda
    else if(MoveAbajo && Posy  < canvas.height -30) {
        Posy += VelocidadY;
        yBala = Posy;
    }
    }
    else if (derrota) {
        PantallaDerrorta();
    }
    else {
        PantallaVictoria();
    }
}
function AumentarFotogramas (){
    if (IncrementoFPS >= 6){
        IncrementoFPS -= 1;
    }
    setInterval(dibujar,IncrementoFPS);
}
AumentarFotogramas();
dibujar();
DibujarTexto();
//Bucle para dibujar cada 10 milisegundos
setInterval(DispararEnemigos,600) ;
//setInterval(AumentarFotogramas,5000)
setInterval(DibujarSuperBalas,200);
//
