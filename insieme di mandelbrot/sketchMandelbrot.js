
var zoomSliderDestra, zoomSliderSinistra;
var zoomValue;

function setup() {
  //nel setup creo gli slider che mi permettono parzialmente di zoommare
  zoomSliderDestra = createSlider(-2, 0, -2, 0.01);
  zoomSliderSinistra = createSlider(0, 2, 2, 0.01);
 }


var delimitazione = 20;//guardo quando la sequenza è limitata in un valore assoluto
var iterazioni = 100;//la sequenza non può essere infinita altrimenti non posso rappresentare i valori

function draw() {//loop infinito per disegnare e controllare ogni pixel

   createCanvas(600, 600)//altezza e larghezza
   background(0);

    pixelDensity(1);
    loadPixels();
    for(var x = 0; x < width; x++){//itero in tutti i pixel in largezza e altezza per controllarne ogni valore
      for(var y = 0; y < height; y++){

        //non voglio avere numeri troppo alti nella funzione ricorsiva, mi basta mappare i pixel a numeri bassi (scelgo -3 e 3)
        var a = map(x, 0, width, zoomSliderDestra.value(), zoomSliderSinistra.value());
        var b = map(y, 0, height, zoomSliderDestra.value(), zoomSliderSinistra.value());
        //ho mappato da -2 -2i fino a +2 +2i (di default), così da non avere troppo elevate richiese compiutazionali
        //point(x,y);

        var lum = 0;//luminosità di ogni pixel in base a quante ricorsioni sono avvenute prima di superare il valore limite preposto
        var limit = 0;//valore che aumenta ad ogni ricorsione e alla fine dell'algoritmoci da un valore che useremo per la luminosità

        var recursioneDiMandelbrot = function(next, SetLimite, globale){//next è il numero complesso che si aggiorna ogni ricorsione, globale è il c di z(n) = z(n-1)+c
          limit++;
          if (abs(next.a + next.b) > delimitazione){
            return;//se ha superato la delimitazione stabiliamo che la successione è infinita
          }else if (limit < SetLimite){
            next.quadrato();//leggere file numeriComlessi.js per info
            next.somma(globale);
            recursioneDiMandelbrot(next, SetLimite, globale);
          }
        }

        let puntoComplesso = new Complex(a, b);//controllo il punto;
        let globalePunto = new Complex(a, b);//c di z(n-1) = z(n-1) + c
        recursioneDiMandelbrot(puntoComplesso, iterazioni, globalePunto);

        //se il numero di iterazioni è il massimo prefissato consideriamo la successione come infinita e la coloreremo di nero
        if (limit === iterazioni){
          lum = (0);
        }else{
          //nel caso sia infinita la coloriamo di bianco in base alle ricorsioni avvenute
          lum = map(limit, 0, iterazioni, 0, 255);
        }

        var pix = (x + y * width) * 4;
        pixels[pix + 0] = lum;
        pixels[pix + 1] = lum;
        pixels[pix + 2] = lum;
        pixels[pix + 3] = 255;
      }
    }
    updatePixels();
}
