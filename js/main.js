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
//let str1 = [];
async function getUser() {
    try {
        const resp = await fetch(url);
        //if (!resp.ok)
        const dataJs = await resp.json();
        //console.log('dataJs ===', dataJs);
        //dataJs.forEach(list);
        const str1 = dataJs.map((val) => val.name);
    } catch (error) {
        console.log('error === klaida ================ ' + error);
    }
    console.log('vardu masyvas', str1);
}

//function list(el) {
//    return str.push(el.name);
//   str.push(el.name);
//    console.log(el.name);
//}
//getUser();