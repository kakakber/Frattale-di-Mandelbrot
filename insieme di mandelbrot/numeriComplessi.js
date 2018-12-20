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


Complex.prototype.somma = function(conNumero){//funzione che somma il numero complesso con uno nuovo

  this.a = this.a + conNumero.a;
  this.b = this.b + conNumero.b;
}

Complex.prototype.quadrato = function(){//funzione che eleva al quadrato, comune a tutte le istanze di un numero complesso
  //(a + bi) * (a + bi) = a^2 - b^2 (parte reale) + 2abi (parte immaginaria).
  var a = this.a;
  this.a = pow(this.a, 2) - (this.b*this.b);
  this.b = 2 * a * this.b;
}

Complex.prototype.cubo = function(){//funzione che eleva al cubo, comune a tutte le istanze di un numero complesso
  //a^3 - 3ab^2 + (3a^2b - b ^3)
  var aq = this.a;
  this.a = pow(this.a, 3) - (3 * this.a * pow(this.b,2));
  this.b = 3 * pow(aq, 2) * this.b - pow(this.b, 3);
}

Complex.prototype.allaQuarta = function(){//funzione che eleva alla quarta, comune a tutte le istanze di un numero complesso
  //(a^4-6a^2b^2+b^4) + (4a^3b-4ab^3)i
  var aqr = this.a;
  this.a = pow(this.a, 4) - 6 * (this.a, 2) * pow(this.b, 2) + pow(this.b, 4);
  this.b = 4 * pow(aqr, 3) * this.b - 4 * this.a * pow(this.b, 3);
}
