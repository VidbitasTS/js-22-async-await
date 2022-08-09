'use strict';
console.log('shop.js');

let url = 'https://fakestoreapi.com/products';
//url = 'data/prod.json';

// taikomes
const formEl = document.forms[0];
//console.log('formEl ===', formEl, formEl.elements.title.value);
const shopItemsEl = document.getElementById('shop-items');
const searchElBtn = document.getElementById('search-btn');
const searchEl = document.getElementById('search');
const searchCh = document.getElementById('search-сheck');
const selectSort = document.getElementById('select-sort');
//const selectSort = document.querySelector('option');
const selectFilter = document.getElementById('select-filter');
const formdBtnEl = document.getElementById('btn-form');
const legendFormEl = document.getElementById('legend-form');

// main Shop state
let mainShopItemsArr = [];
let sortMainShopItemsArr = [];
let filterMainShopItemsArr = [];
let selectFilterItem = [];
let selecFiltertCount = 2;
let sortFilter = [];

// pagrindinis veiksmas
getProducts(url).then((items) => makeShopItemsList(items));

// event listeners
window.addEventListener('click', (e) => {
    console.log(e, e.target.value, e.target.id, e.target.tagName);
    let updateBtnId = '0';
    if (e.target.id.substr(0, 10) == 'btn-update') {
        updateBtnId = document.querySelector(`#${e.target.id}`).value;
        console.log(e, e.target.value, e.target.id, e.target.tagName, updateBtnId);
    }
    switch (e.target.id) {
        case 'new-card':
            document.querySelector('#prod-id').style.display = 'none';
            formdBtnEl.textContent = 'Create New Card';
            legendFormEl.textContent = 'New Card';
            formdBtnEl.value = '0';
            document.querySelector('.modal').style.display = 'block';
            formCreateValue();
            break;
        case 'btn-update' + updateBtnId:
            formdBtnEl.textContent = 'Update Card';
            legendFormEl.textContent = 'Update Card';
            formdBtnEl.value = '1';
            document.querySelector('.modal').style.display = 'block';

            formUpdateValue(updateBtnId);
            break;
        case 'close':
            document.querySelector('.modal').style.display = 'none';
            break;
        case 'btn-form':
            e.preventDefault();
            if (formdBtnEl.value === '0') {
                createNewCard();
            } else {
                updateCard(updateBtnId);
            }
            document.querySelector('.modal').style.display = 'none';
            break;
    }
});

function formCreateValue() {
    // const title = document.querySelector('#title-form').value;
    // const price = Number(document.querySelector('#price-form').value).toFixed(2);
    // const descr = document.querySelector('#descr-form').value;
    // const categ = document.querySelector('#categ-form').value;
    // const image = document.querySelector('#image-form').value;
    // const newProdValue = {
    //     title: title,
    //     //       price: price,
    //     descr: descr,
    //     categ: categ,
    //     image: image,
    //     rating: {
    //         rate: 0,
    //         count: 0,
    //     },
    // };

    formEl.elements.title.value = '';
    formEl.elements.price.value = 0;
    formEl.elements.description.value = '';
    formEl.elements.category.value = '';
    formEl.elements.image.value = '';

    // const newProdValue = {
    //     title: formEl.elements.title.value,
    //     price: parseInt(formEl.elements.price.value).toFixed(2),
    //     description: formEl.elements.description.value,
    //     category: formEl.elements.category.value,
    //     image: formEl.elements.image.value,
    // };

    // console.log(newProdValue);
    // return newProdValue;
}

async function formUpdateValue(id) {
    const resp = await fetch(`${url}/${id}`);
    const singleProduct = await resp.json();

    formEl.elements.id.value = singleProduct.id;
    formEl.elements.title.value = singleProduct.title;
    formEl.elements.price.value = singleProduct.price;
    formEl.elements.description.value = singleProduct.description;
    formEl.elements.category.value = singleProduct.category;
    formEl.elements.image.value = singleProduct.image;
}

async function createNewCard() {
    const createValue = {
        title: formEl.elements.title.value,
        price: parseInt(formEl.elements.price.value).toFixed(2),
        description: formEl.elements.description.value,
        category: formEl.elements.category.value,
        image: formEl.elements.image.value,
    };
    console.log(JSON.stringify(createValue));
    const resp = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(createValue),
    });
    console.log('resp ===', resp);
    if (resp.ok) {
        const dataInJs = await resp.json();
        console.log('create dataInJs ===', dataInJs);
        //alert('create success');
        const succ = document.querySelector('#success');
        succ.style.display = 'inline';
        succ.textContent = 'create success';
        const myTimeout = setTimeout(() => {
            succ.style.display = 'none';
        }, 5000);

        return;
    }
    const errorResponseMessage = await resp.text();
    alert(errorResponseMessage);
}

async function updateCard(id) {
    const updateValue = {
        title: formEl.elements.title.value,
        price: parseInt(formEl.elements.price.value).toFixed(2),
        description: formEl.elements.description.value,
        category: formEl.elements.category.value,
        image: formEl.elements.image.value,
    };

    console.log('JSON.stringify(param)', updateValue);
    const resp = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(updateValue),
    });
    console.log('resp ===', resp);
    if (resp.ok) {
        const dataInJs = await resp.json();
        console.log('update dataInJs ===', dataInJs);
        // alert('update success');
        const succ = document.querySelector('#success');
        succ.style.display = 'inline';
        succ.textContent = 'update success';
        const myTimeout = setTimeout(() => {
            succ.style.display = 'none';
        }, 5000);
        return;
    }
    const errorResponseMessage = await resp.text();
    alert(errorResponseMessage);
}

searchElBtn.addEventListener('click', (e) => {
    inputSearch();
});

searchEl.addEventListener('input', (e) => {
    if (!searchCh.checked) return;
    inputSearch();
});

selectSort.addEventListener('click', (e) => {
    if (e.target[e.target.value].value === '0') return;

    if (
        sortFilter.length === 0 ||
        sortFilter === undefined ||
        sortFilter === 'object' ||
        e.target.value === '1'
    ) {
        console.log('geras sort');
        sortFilter = mainShopItemsArr;
    }
    if (e.target.value === '2') {
        sortFilter = sortMainShopItemsArr.sort((a, b) => {
            return Number(a.price) - Number(b.price);
        });
    }
    if (e.target.value === '3') {
        sortFilter = sortMainShopItemsArr.sort((a, b) => {
            return Number(b.price) - Number(a.price);
        });
    }

    makeShopItemsList(sortFilter);
});

selectFilter.addEventListener('click', (e) => {
    console.log(e.target.value);
    if (e.target[e.target.value].value === '0') return;
    console.log(
        'selectFilter ===',
        sortMainShopItemsArr,
        e.target[e.target.value].tagName,
        e.target[e.target.value].value
    );
    //    console.log('selectFilter====== ', e.target[e.target.value].textContent);
    // if (sortMainShopItemsArr.length === 0) {
    //     sortMainShopItemsArr = mainShopItemsArr;
    // }

    if (
        sortFilter.length === 0 ||
        sortFilter === undefined ||
        sortFilter === 'object' ||
        e.target.value === '1'
    ) {
        console.log('geras filter');
        sortFilter = mainShopItemsArr;
    } else {
        sortFilter = sortMainShopItemsArr.filter(
            (el) => el.category === e.target[e.target.value].textContent.trim()
        );
    }
    //sortMainShopItemsArr = sortFilter;
    makeShopItemsList(sortFilter);
});

// funkcijos
function inputSearch() {
    //   console.log(sortMainShopItemsAr);
    // if (sortMainShopItemsArr.length !== 0) {
    //     mainShopItemsArr = sortMainShopItemsArr;
    // }
    //mainShopItemsArr = sortMainShopItemsAr;
    const searchElVal = searchEl.value.trim();
    console.log(searchElVal);
    const search = mainShopItemsArr.filter((shObj) =>
        shObj.title.toLowerCase().includes(searchElVal.toLowerCase())
    );
    sortMainShopItemsArr = search;
    //   console.log(search);
    makeShopItemsList(sortMainShopItemsArr);
}

async function getProducts(argUrl) {
    const resp = await fetch(argUrl);
    const dataInJS = await resp.json();
    //   console.log('dataInJS ===', dataInJS);
    mainShopItemsArr = dataInJS;
    //   sortMainShopItemsArr = dataInJS;
    return dataInJS;
}

function makeShopItemsList(shopItemsArr) {
    shopItemsEl.innerHTML = '';

    shopItemsArr.forEach((itemObj) => {
        const oneItemHtmlEl = makeOneCard(itemObj);
        shopItemsEl.append(oneItemHtmlEl);
    });

    for (var i = 0, l = mainShopItemsArr.length; i < l; i++) {
        if (
            selectFilterItem.indexOf(mainShopItemsArr[i].category) === -1 &&
            mainShopItemsArr[i] !== ''
        ) {
            selectFilterItem.push(mainShopItemsArr[i].category);
            const liEl = document.createElement('option');
            liEl.textContent = mainShopItemsArr[i].category;
            liEl.value = selecFiltertCount;
            selecFiltertCount++;
            selectFilter.append(liEl);
        }
    }
}

function makeOneCard(shopObj) {
    // pagaminam ir grazinam viena item
    // img, price, title, category
    const divEl = document.createElement('div');
    divEl.className = 'shop-item card';
    divEl.innerHTML = `
  <img src="${shopObj.image}" alt="preke">
  <h3>${shopObj.title}</h3>
  <p class="price">€${shopObj.price.toFixed(2)}</p>
  <p>Category: ${shopObj.category}</p>
  <div class="control">
    <button class="buy-btn">Buy</button>
    <a href="single-preke.html?id=${shopObj.id}">More info</a>
    <button id="btn-update${shopObj.id}" value="${shopObj.id}">Update</button>
  </div>
  `;
    return divEl;
}