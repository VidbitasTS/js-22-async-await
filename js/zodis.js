'use strict';
console.log('zodis.js');

const arr = {
    vienetai: [
        ' nulis',
        ' vienas',
        ' du',
        ' trys',
        ' keturi',
        ' penki',
        ' šeši',
        ' septyni',
        ' aštuoni',
        ' devyni',
    ],
    iolika: [
        ' vienuolika',
        ' dvylika',
        ' trylika',
        ' kturiolika',
        ' penkiolika',
        ' šešiolika',
        ' septyniolika',
        ' aštuoniolika',
        ' devyniolika',
    ],
    desimt: [
        ' dvidešimt',
        ' trisdešimt',
        ' keturiasdešimt',
        ' penkiasdešimt',
        ' šiašesdešimt',
        ' septyniasdešimt',
        ' aštuoniasdešimt',
        ' devyniasdešimt',
    ],
    simtas: [' šimtas', ' šimtai'],
    tukstantis: [' tūkstantis', ' tūkstančiai', ' tūkstančių'],
};

function text(n) {
    //const str = n.split('');
    const str = n.toString();
    console.log(str.substr(1, 1));
    // switch () {
    const length = str.length;
    let text = '';
    //for (let i = 1; i <= length; i++) {
    //console.log(i);
    switch (length) {
        case 1: // vienetai
            text += arr['vienetai'][str];
            console.log(text);
            break;
        case 2: // nuo 10 iki 99
            if (str === '10') {
                text += 'dešimt';
            } else if (str < '20') {
                text += arr['iolika'][str - 11];
            } else if (str.substr(1, 1) === '0') {
                text += arr['desimt'][str.substr(0, 1) - 2];
            } else {
                text += arr['desimt'][str.substr(0, 1) - 2];
                text += arr['vienetai'][str.substr(1, 1)];
            }
            break;
        case 3: // nuo 100 iki 999
            text += arr['vienetai'][str.substr(0, 1)];
            if (str.substr(0, 1) === '1') {
                text += arr['simtas'][0];
            } else {
                text += arr['simtas'][1];
            }
            break;
    }
    console.log(text);
    //}

    // }
}

text('200');