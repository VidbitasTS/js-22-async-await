'use strict';
console.log('main.js');

//const url = 'https://reqres.in/api/users/5000';
const url = 'https://jsonplaceholder.typicode.com/users';

// fetch(url)
//     .then((resp) => resp.json())
//     .then((data) => {
//         console.log('data ===', data.data);
//     })
//     .catch((err) => console.log('err ===', err));
let str = [];
async function getUser() {
    try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error('Baddddd');
        const dataJs = await resp.json();
        //console.log('dataJs ===', dataJs);
        dataJs.forEach(list);
    } catch (error) {
        console.log('error === klaida ================ ' + error);
    }
    console.log('vardu masyvas', str);
}

function list(el) {
    return push(el.name);
    //   str.push(el.name);
    //    console.log(el.name);
}
getUser();