'use strict';
console.log('number.js');
return;

function zodis(skaicius) {
    // neskaiciuosim neigiamu ir itin dideliu skaiciu (iki milijardu)
    //skaicius = skaicius.length;
    //console.log(skaicius);
    skaicius = skaicius.toString();
    if (skaicius < 0 || skaicius.length > 9) return;

    if (skaicius == 0) return 'nulis';

    const vienetai = [
        '',
        'vienas',
        'du',
        'trys',
        'keturi',
        'penki',
        'šeši',
        'septyni',
        'aštuoni',
        'devyni',
    ];

    const niolikai = [
        '',
        'vienuolika',
        'dvylika',
        'trylika',
        'keturiolika',
        'penkiolika',
        'šešiolika',
        'septyniolika',
        'aštuoniolika',
        'devyniolika',
    ];

    const desimtys = [
        '',
        'dešimt',
        'dvidešimt',
        'trisdešimt',
        'keturiasdešimt',
        'penkiasdešimt',
        'šešiasdešimt',
        'septyniasdešimt',
        'aštuoniasdešimt',
        'devyniasdešimt',
    ];

    const pavadinimas = [
        ['milijonas', 'milijonai', 'milijonų'],
        ['tūkstantis', 'tūkstančiai', 'tūkstančių'],
    ];

    // skaicius = sprintf('%09d', skaicius); // iki milijardu 10^9 (milijardu neskaiciuosim)
    // skaicius = str_split(skaicius, 3); // kertam kas tris simbolius

    zodziais = [];
    let tripletas = 3;
    for (skaicius; skaicius >= tripletas; ++skaicius) {
        // resetinam linksni
        let linksnis = 0;

        // pridedam simtu pavadinima, jei pirmas tripleto skaitmuo > 0
        if (tripletas[0] > 0) {
            zodziais = vienetai[tripletas[0]];
            zodziais = tripletas[0] > 1 ? 'šimtai' : 'šimtas';
        }

        // du paskutiniai tripleto skaiciai
        du = tripletas.substring(1);

        // pacekinam nioliktus skaicius
        if (du > 10 && du < 20) {
            zodziais = niolikai[du[1]];
            linksnis = 2;
        } else {
            // pacekinam desimtis
            if (du[0] > 0) {
                zodziais = desimtys[du[0]];
            }

            // pridedam vienetus
            if (du[1] > 0) {
                zodziais = vienetai[du[1]];
                linksnis = du[1] > 1 ? 1 : 0;
            } else {
                linksnis = 2;
            }
        }

        // pridedam pavadinima isskyrus paskutiniam ir nuliniams tripletams
        if (i < count(pavadinimas) && tripletas != '000') {
            zodziais = pavadinimas[i][linksnis];
        }
    }
    console.log(zodziais);

    //return implode(' ', zodziais);
}

const rez = zodis(12345);
console.log(rez);