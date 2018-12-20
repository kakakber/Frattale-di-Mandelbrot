//gestire il controllo delle schermate per mostrare julia
//aprire il file index.html con chrome, tasto dx, ispeziona, console.

let JuliaInfo = "Opzioni per gestire frattali di Julia:\n\n 1 - Frattale di default per c = -0.835 -0.2321i: \ndigita inJuliaDefault(); .\n\n 2 - Scegli tu il numero complesso: \ndigita inJuliaCustom(valoreA, valoreB); .\n\n 3 - il numero complesso varia con la posizione del mouse: \ndigita JuliaMouse(); \n\n 4 - Animazione: \ndigita JuliaAnimation(); .\n\nPer bloccare e tornare a Mandelbrot:\ndigita noJulia();.\nSe qualcosa va storto refresha la pagina (:"

 function inJuliaDefault(){//sulla console digitare inJuliaDefault(); e premere invio, mostrerà l'insieme di julia per il numero complesso indicato nella funzione
    JuliaComplex = new Complex(-0.835, -0.2321)
    isJulia = true;
 }
//−0.8 + 0.156i
 function inJuliaCustom(a, b){//sulla console digitare inJuliaCustom(numero a, numero b); per opzioni visitare la pagina https://en.wikipedia.org/wiki/Julia_set
    JuliaComplex = new Complex(a, b)
    isJulia = true;
    isJuliaAnimation = false;
    isJuliaMouse = false;
 }

 function nonJulia(){//sulla console digitare nonJulia();
   isJuliaMouse = false;
   isJulia = false;
   isJuliaAnimation = false;
 }

 var isJuliaMouse = false;
 function JuliaMouse(){//sulla console digitare JuliaMouse(); varia il numero complesso in base alla pos del mouse
   isJulia = true;
   isJuliaAnimation = false;
   JuliaComplex = new Complex(-0.835, -0.2321);
   if (!isJuliaMouse){
     isJuliaMouse = true
   }else{
     isJuliaMouse = false
   }
 }

 var isJuliaAnimation = false;
 function JuliaAnimation(){//sulla console digitare JuliaAnimation();
   isJulia = true;
   isJuliaMouse = false;
   JuliaComplex = new Complex(-0.835, -0.2321);
   if (!isJuliaAnimation){
     isJuliaAnimation = true
   }else{
     isJuliaAnimation = false
   }
 }

//gestione colori -----------*------------

 const colori = {
   BIANCO: 'bianco',
   ROSSO: 'rosso',
   VERDE: 'verde',
   BLU: 'blu',
   AZZURRO: 'azzurro',
   GIALLO: 'giallo',
   VIOLA: 'viola',
 }

 function rosso(){
   colore = colori.ROSSO;
 }
 function verde(){
   colore = colori.VERDE;
 }
 function blu(){
   colore = colori.BLU;
 }
 function giallo(){
   colore = colori.GIALLO;
 }
 function azzurro(){
   colore = colori.AZZURRO;
 }
 function viola(){
   colore = colori.VIOLA;
 }
 function bianco(){
   colore = colori.BIANCO;
 }

 let coloriInfo = "Puoi cambiare il colore a tua scelta, digitare le seguenti istruzioni in base al colore desiderato: bianco(); rosso(); verde(); blu(); giallo(); viola(); azzurro();"
