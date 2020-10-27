/**
 * Verkefni 7 – Caesar dulmál
 */

const LETTERS = `AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ`;

/**
 * Byrja forrit.
 */
const fylki = Array.from(LETTERS);

function start() {
  let utkoma = prompt('Viltu kóða eða afkóða\nSkrifaður kóða eða afkóða.');
  if(utkoma === 'kóða' || utkoma === 'afkóða'){
    finnahlidrun(utkoma);
  }
  /*else{
    //ekki skrifað rétt
  }*/
}

function finnahlidrun(adgerd){
  let n = prompt('Hversu mikið á að hliðra?');
  if(1 <= n && n <= 31){
    n = Number.parseInt(n, 10);
    finnaStreng(adgerd, n);
  }
}

function finnaStreng(adgerd, n){
  let strengur = prompt('Sláðu inn streng');
  strengur = strengur.toLocaleUpperCase();
  let nidurstada;
  if(adgerd === 'kóða'){
    nidurstada = encode(strengur, n);
  }
  else if(adgerd === 'afkóða') {
    nidurstada = decode(strengur, n);
  }
  alert(nidurstada);
  aftur();
}

function aftur() {
  let aftur = confirm('Viltu gera aftur?');
  if(aftur) start();
}

// Hér er gott að commenta út til að vinna í encode/decode föllum fyrst og síðan „viðmóti“ forrits
start();

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n) {
  let lokastrengur = "";

  for(var i = 0; i < str.length; i++){
    stafur = str.charAt(i);
    for(var j = 0; j < fylki.length; j++){
      if(stafur == fylki[j]){
        if (j+n<fylki.length){
          let nyrstafur = fylki[j + n];
          lokastrengur = lokastrengur + nyrstafur;
        }
        else{
          let nyrstafur = fylki[(j+n)%32];
          lokastrengur = lokastrengur + nyrstafur;
        }
        break;
      }
    }
  }
  str = lokastrengur;
  return str;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n) {
  let lokastrengur = "";

  for(var i = 0; i < str.length; i++){
    stafur = str.charAt(i);
    for(var j = 0; j < fylki.length; j++){
      if(stafur == fylki[j]){
        if (j-n>0){
          let nyrstafur = fylki[j - n];
          lokastrengur = lokastrengur + nyrstafur;
        }
        else{
          let nyrstafur = fylki[(j-n+32)%32];
          lokastrengur = lokastrengur + nyrstafur;
        }
        break;
      }
    }
  }
  str = lokastrengur;
  return str;
}

console.assert(encode('A', 3) === 'D', 'kóðun á A með n=3 er D');
console.assert(decode('D', 3) === 'A', 'afkóðun á D með n=3 er A');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 32) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'kóðun með n=32 er byrjunarstrengur');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 3) === 'DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 'kóðun á stafrófi með n=3');
console.assert(decode('DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 3) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'afkóðun á stafrófi með n=3');
console.assert(decode(encode('HALLÓHEIMUR', 13), 13) === 'HALLÓHEIMUR', 'kóðun og afkóðun eru andhverf');
