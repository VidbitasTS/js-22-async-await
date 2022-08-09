'use strict';
console.log('number1.js');

// const zodziai = {
//     vienetai: [
//         'vienas',
//         'du',
//         'trys',
//         'keturi',
//         'penki',
//         'šeši',
//         'septyni',
//         'aštuoni',
//         'devyni',
//     ],
//     lika: [
//         'dešimt',
//         'vienuolika',
//         'dvylika',
//         'trylika',
//         'keturiolika',
//         'penkiolika',
//         'šešiolika',
//         'septyniolika',
//         'aštuniolika',
//     ],
//     desimtys: [
//         'dvidešimt',
//         'trisdešimt',
//         'keturiasdešimt',
//         'penkiasdešimt',
//         'šešiasdešimt',
//         'septyniasdešimt',
//         'aštuoniasdešimt',
//         'devyniasdešimt',
//     ],
// };

const zodziai = [{
        vienetai: [
            'vienas',
            'du',
            'trys',
            'keturi',
            'penki',
            'šeši',
            'septyni',
            'aštuoni',
            'devyni',
        ],
    },
    {
        lika: [
            '',
            'dešimt',
            'vienuolika',
            'dvylika',
            'trylika',
            'keturiolika',
            'penkiolika',
            'šešiolika',
            'septyniolika',
            'aštuniolika',
            'devyniolika',
        ],
    },
    {
        desimtys: [
            'dvidešimt',
            'trisdešimt',
            'keturiasdešimt',
            'penkiasdešimt',
            'šešiasdešimt',
            'septyniasdešimt',
            'aštuoniasdešimt',
            'devyniasdešimt',
        ],
    },
];

const sk = 20;

function tekstas(n) {
    const nStr = n.toString();
    console.log(typeof nStr, nStr.length);
    const length = nStr.length;

    for (const i = 0; i < length; i++) {
        if (n < 10) {
            return zodziai[0]['vienetai'][n - 1];
        }
        if (n < 20) {
            return zodziai[1]['lika'][n - 9];
        }
    }
}

console.log('geras atsakymas ===:', tekstas(sk));
console.log('atsakymas===: ', zodziai);
//debugger;