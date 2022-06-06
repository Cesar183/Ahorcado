var pantalla = document.querySelector("canvas");
    var pincel = pantalla.getContext("2d");
var palabras = ['GITHUB','DESAFIO', 'ORACLE', 'HTML','HOME','LOGICA'];
var tablero = document.getElementById("horca").getContext("2d");
var letras= [];
var palabraCorrecta = "";
var errores = 9;

function DibujarBase()
{
    pincel.fillStyle = "black";
    pincel.lineWidth = 6;
    pincel.beginPath();
    pincel.moveTo(500,500);
    pincel.lineTo(1000,500);
    pincel.stroke();
}
function DibujarColumna()
{
    pincel.fillStyle = "black";
    pincel.lineWidth = 6;
    pincel.beginPath();
    pincel.moveTo(600,500);
    pincel.lineTo(600,100);
    pincel.stroke();
}
function DibujarViga()
{
    pincel.fillStyle = "black";
    pincel.lineWidth = 6;
    pincel.beginPath();
    pincel.moveTo(600,100);
    pincel.lineTo(800,100);
    pincel.stroke();
}
function DibujarCuerda()
{
    pincel.fillStyle = "black";
    pincel.lineWidth = 6;
    pincel.beginPath();
    pincel.moveTo(800,100);
    pincel.lineTo(800,150);
    pincel.stroke();
}
function DibujarCabeza()
{
    pincel.fillStyle = "black";
    pincel.lineWidth = 6;
    pincel.beginPath();
    pincel.arc(800,180,26,0,2*3.14);
    pincel.stroke();
}
function DibujarCuerpo()
{
    pincel.fillStyle = "black";
    pincel.lineWidth = 6;
    pincel.beginPath();
    pincel.moveTo(800,210);
    pincel.lineTo(800,350);
    pincel.stroke();
}
function DibujarBrazoIzquierdo()
{
    pincel.fillStyle = "black";
    pincel.lineWidth = 6;
    pincel.beginPath();
    pincel.moveTo(800,210);
    pincel.lineTo(760,260);
    pincel.stroke();
}
function DibujarBrazoDerecho()
{
    pincel.fillStyle = "black";
    pincel.lineWidth = 6;
    pincel.beginPath();
    pincel.moveTo(800,210);
    pincel.lineTo(840,260);
    pincel.stroke();
}
function DibujarPieIzquierdo()
{
    pincel.fillStyle = "black";
    pincel.lineWidth = 6;
    pincel.beginPath();
    pincel.moveTo(800,350);
    pincel.lineTo(760,400);
    pincel.stroke();
}
function DibujarPieDerecho()
{
    pincel.fillStyle = "black";
    pincel.lineWidth = 6;
    pincel.beginPath();
    pincel.moveTo(800,350);
    pincel.lineTo(840,400);
    pincel.stroke();
}
DibujarBase();
/*
DibujarColumna();
DibujarViga();
DibujarCuerda();
DibujarCabeza();
DibujarCuerpo();
DibujarBrazoIzquierdo();
DibujarBrazoDerecho();
DibujarPieIzquierdo();
DibujarPieDerecho(); 
*/

function EscogerPalabraSecreta()
{
    var palabra = palabras[Math.floor(Math.random()*palabras.length)];
    palabraSecreta = palabra;
    console.log(palabra);
    return palabra
}
function DibujarLinea()
{
    tablero.lineWidth = 6;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.strokeStyle = "#000000"; //"#0A3871";
    tablero.beginPath();

    var ancho = 600/ palabraSecreta.length;
    for(var i = 0; i<palabraSecreta.length; i++)
    {
        tablero.moveTo(500 + (ancho*i), 640);
        tablero.lineTo(550 + (ancho*i), 640);
    }
    tablero.stroke();
    tablero.closePath();
}
DibujarLinea(EscogerPalabraSecreta());
function EscribirLetraCorrecta(index)
{
    tablero.font = "bold 52px Inter";
    tablero.lineWidth = 6;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.fillStyle = "#000000";//"#0A3871";

    var ancho = 600/ palabraSecreta.length;
    tablero.fillText(palabraSecreta[index], 505 + (ancho*index),620)
}
function EscribirLetraIncorecta(letra, errorsLeft)
{
    tablero.font = "bold 40px Inter";
    tablero.lineWidth = 6;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.fillStyle = "#808080"; //"#0A3871";
    tablero.fillText(letra,535 + (40 * (10 - errorsLeft)),710, 40);
}
function VerificarLetraPulsada(key)
{
    if(letras.length < 1 || letras.indexOf(key) < 0)
    {
        letras.push(key);
        return false
    }
    else
    {
        letras.push(key);
        return true
    }
}
function AdicionarLetraCorrecta(i)
{
    palabraCorrecta += palabraSecreta[i].toUpperCase();
}
function AdicionarLetraIncorrecta(letter)
{
    if(palabraSecreta.indexOf(letter) <= 0)
    {
        errores -= 1;
    }
}
document.onkeydown = (e) =>
{
    let letra = e.key.toUpperCase()
    if(!VerificarLetraPulsada(e.key))
    {
        if(palabraSecreta.includes(letra))
        {
            console.log(letra);
            AdicionarLetraCorrecta(palabraSecreta.indexOf(letra));
            for(var i = 0; i < palabraSecreta.length; i++)
            {
                if(palabraSecreta[i]===letra)
                {
                    EscribirLetraCorrecta(i);
                    if(palabraCorrecta.length == palabraSecreta.length)
                    {
                        JuegoGanado();
                    }
                }
            }
        }
        else
        {
            if(!VerificarLetraPulsada(e.key)) return
            AdicionarLetraIncorrecta(letra);
            EscribirLetraIncorecta(letra, errores);
            switch (errores)
            {
                case 8:
                    DibujarColumna();
                    break;
                case 7:
                    DibujarViga();
                    break;
                case 6:
                    DibujarCuerda();
                    break;
                case 5:
                    DibujarCabeza();
                    break;
                case 4:
                    DibujarCuerpo();
                    break;
                case 3:
                    DibujarBrazoIzquierdo();
                    break;
                case 2:
                    DibujarBrazoDerecho();
                    break;
                case 1:
                    DibujarPieIzquierdo();
                    break;
                case 0:
                    DibujarPieDerecho();
                    JuegoPerdido();
                    break;
            }
                
        }
    }
};
function JuegoGanado() 
{
    tablero.font = "40px Inter";
    tablero.fillText("Ganaste, Felicidades!", 850, 300);
    tablero.fillStyle = "#008000";
    tablero.stroke();
    tablero.closePath();
}
function JuegoPerdido() 
{
    tablero.font = "40px Inter";
    tablero.fillText("Juego Terminado!", 850, 300);
    tablero.fillStyle = "#FF0000";
    tablero.stroke();
    tablero.closePath();
}
