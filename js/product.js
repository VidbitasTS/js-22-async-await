'use strict';
console.log('product.js');

const url = 'https://fakestoreapi.com/products';
//const url = 'data/prod.json';
const divEl = document.querySelector('.card');
//getProd().then((items) => list());
getProd();
async function getProd() {
    const resp = await fetch(url);
    const dataJs = await resp.json();
    console.log('dataJs ===', dataJs);
    // return dataJs;
    dataJs.forEach(addCard);
    // try {
    //     const resp = await fetch(url);
    //     if (!resp.ok) throw new Error('Baddddd');
    //     const dataJs = await resp.json();
    //     dataJs.forEach((e) => addCard(e));
    // } catch (error) {
    //     console.log('error === klaida ================ ' + error);
    // }
}

function addCard(el) {
    //   console.log(el.title);
    const divEl1 = document.createElement('div');
    divEl1.className = 'item cards';
    divEl.append(divEl1);
    const pEl = document.createElement('p');
    const ph3 = document.createElement('h3');
    const imgEl = document.createElement('img');
    const priceEl = document.createElement('p');
    pEl.textContent = el.category;
    ph3.textContent = el.title;
    imgEl.src = el.image;
    imgEl.className = 'imgClass';
    priceEl.src = el.price;
    divEl1.append(imgEl, ph3, priceEl, pEl);
}

// function list(arr) {
//     arr.forEach((itemObj) => {
//         const one = addCard(itemObj);
//         one.append(one);
//     });
// }