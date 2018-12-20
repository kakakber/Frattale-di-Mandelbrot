var iterazSlider;

var JuliaComplex;
var isJulia = false;

var h;
var colore;

function setup() {
  //nel setup creo gli slider che mi permettono parzialmente di zoommare
  console.log("Range: -2-21 -> +2+2i.\nBenvenuto/a, per vedere le funzioni inerenti a julia digita JuliaInfo e premi invio, per informazioni sul cambio di colore digita coloriInfo e premi invio");
  iterazSlider = createSlider(0, 1500, 100, 1);
  iterazSlider.position = (100, 100);
  colore = colori.AZZURRO;
}

 var minimo = -2;
 var massimo = 2;

 function zoom() {
   //prendi 20%
   var dimVal = 20 / 100 * (minimo - massimo);
    var xMap = map(mouseX, 0, width, minimo, massimo)
    var yMap = map(mouseY, 0, height, minimo, massimo);
    minimo = xMap + dimVal;
    massimo = yMap - dimVal;
   console.log("min: " + minimo + "\nmax: " + massimo + "\nrange: " + (massimo - minimo) + "\niterazioni: " + iterazioniMassime);
 }
 /*var dimVal = (20 / 100) * (massimo - minimo);
 console.log("20% di " + (massimo - minimo) + " è " + dimVal);
  var xMap = map(mouseX, 0, width, minimo, massimo)
  var yMap = map(mouseY, 0, height, minimo, massimo);
  /*var f = xMap - dimVal;
  var g = yMap - dimVal;
  var minF = -pow((pow((xMap + dimVal), 2) + pow((yMap + dimVal), 2)), 1/2);
  minimo = minF;
  massimo = pow((pow((xMap + dimVal), 2) + pow((yMap + dimVal), 2)), 1/2);
  let diff = massimo - minimo;*/

var delimitazione = 20;//guardo quando la sequenza è limitata in un valore assoluto
var iterazioniMassime = 100;//la sequenza non può essere infinita altrimenti non posso rappresentare i valori

var angolo = 0;

function draw() {//loop infinito per disegnare e controllare ogni pixel

   if (isJuliaMouse){
     //mappa il mouse e varia il numero complesso globale 'JuliaComplex'
     var xs = map(mouseX, 0, width, -1, 1)
     var bsa = map(mouseY, 0, height, -1, 1);
     JuliaComplex.a = xs;
     JuliaComplex.b = bsa;
   }

   if (isJuliaAnimation){
     //console.log("sdas");
     JuliaComplex.a = cos(angolo*3.3);
     JuliaComplex.b = sin(angolo);//per andare da -1 a 1
     angolo += 0.1;
   }

   var g = createCanvas(600, 600)//altezza e larghezza
   g.mousePressed(zoom);//quando premo mouse richiama funzione zoom
   g.mouse

   background(0);
   pixelDensity(1);
   loadPixels();

    for(var x = 0; x < width; x++){//itero in tutti i pixel in largezza e altezza per controllarne ogni valore
      for(var y = 0; y < height; y++){
        //non voglio avere numeri troppo alti nella funzione ricorsiva, mi basta mappare i pixel a numeri bassi (scelgo -2 e 2 di default)
        iterazioniMassime = iterazSlider.value();

        var a = map(x, 0, width, minimo, massimo);
        var b = map(y, 0, height, minimo, massimo);
        //ho mappato da -2 -2i fino a +2 +2i (di default), così da non avere troppo elevate richiese compiutazionali e poter rappresentare il frattale
        //point(x,y);

        var lum = 0;//luminosità di ogni pixel in base a quante ricorsioni sono avvenute prima di superare il valore limite preposto
        var limit = 0;//valore che aumenta ad ogni ricorsione e alla fine dell'algoritmo ci da un valore che useremo per la luminosità

        var recursioneDiMandelbrot = function(next, globale){//next è il numero complesso che si aggiorna ogni ricorsione, globale è il c di z(n) = z(n-1)+c
          limit++;
          if (abs(next.a + next.b) > delimitazione){
            return;//se ha superato la delimitazione stabiliamo che la successione è infinita
          }else if (limit < iterazioniMassime){
            next.quadrato();//leggere file numeriComlessi.js per info, togliere e mettere commenti in base alla formula che si vuole
            //next.cubo();
            //next.allaQuarta();
            next.somma(globale);
            recursioneDiMandelbrot(next, globale);
          }
        }

        let puntoComplesso = new Complex(a, b);//controllo il punto;
        let globalePunto = new Complex(a, b);//c di z(n-1) = z(n-1) + c
        if (!isJulia){
        recursioneDiMandelbrot(puntoComplesso, globalePunto);//input punti relegati a x e y
      }else{
        recursioneDiMandelbrot(puntoComplesso, JuliaComplex)//imput in base sia a x e y ma anche var globale complessa 'JuliaComplex'
      }

      var r, g, b;
        //se il numero di iterazioni è il massimo prefissato consideriamo la successione come finita e la coloreremo di nero
        if (limit === iterazioniMassime){
          r = 0; g = 0; b = 0;
        }else{
          //nel caso sia infinita la coloriamo in base alle ricorsioni necessarie per "superare l'infinito"
          lum = map(limit, 0, iterazioniMassime, 0, 255);
          switch (colore){
            case "bianco":
                r = lum; g = lum; b = lum;
                break;
            case "rosso":
                r = lum; g = 0; b = 0;
                break;
            case "verde":
                r = 0; g = lum; b = 0;
                break;
            case "blu" :
                r = 0; g = 0; b = lum;
                break;
            case "giallo":
                r = lum; g = lum; b = 0;
                break;
            case "azzurro":
                r = 0; g = lum; b = lum;
                break;
            case "viola":
                r = lum; g = 0; b = lum;
                break;
            default://di def verde
                r = 0; g = lum; b = lum;
                break;
        }
      }

        var pix = (x + y * width) * 4;//scegliere il pixel e colorarlo
        pixels[pix + 0] = r;//rosso
        pixels[pix + 1] = g;//verde
        pixels[pix + 2] = b;//blu
        pixels[pix + 3] = 255;
      }
    }
    updatePixels();
}
