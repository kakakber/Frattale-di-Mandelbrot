//file per gestire creazione e operazioni con i numeri numeriComplessi

function Complex(a, b){
  /*il numero complesso sarà a + bi
  dato che z(n) = z^2(n-1) + c; e z(1) = 0 + c = c; z(2) = c^2 + c
  devo capire come elevare c al quadrato poichè è l'unico fattore che ci servirà per la ricorsione
  avendo: (a + bi)^2 = (a + bi) * (a + bi) =
  a^2 + abi + abi + b^2i^2 = (dato che i^2 = -1)
  = 2abi + a^2 - b^2 = a^2 - b^2 (parte reale) + 2abi (parte immaginaria).
  per ogni recursione otterremo quindi un numero immaginario che, sommato a c, diventerà il z(n-1) della successiva ricorsione
  */

this.a = a;
this.b = b;
}


Complex.prototype.quadrato = function(){//funzione che eleva al quadrato, comune a tutte le istanze di un numero complesso
  //(a + bi) * (a + bi) = a^2 - b^2 (parte reale) + 2abi (parte immaginaria).
  var a = this.a;
  this.a = (this.a*this.a) - (this.b*this.b);
  this.b = 2 * a * this.b;
}

Complex.prototype.somma = function(conNumero){//funzione che somma il numero complesso con un nuovo numero

  this.a = this.a + conNumero.a;
  this.b = this.b + conNumero.b;
}
