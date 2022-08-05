'use strict';
console.log('shop.js');

let url = 'https://fakestoreapi.com/products';
//url = 'data/prod.json';

// taikomes
const shopItemsEl = document.getElementById('shop-items');
const sortPriceBtnEl = document.getElementById('sort-price');
const sortPriceBtnAscEl = document.getElementById('sort-price-asc');
const searchElBtn = document.getElementById('search-btn');
const searchEl = document.getElementById('search');
const searchCh = document.getElementById('search-сheck');
const selectSort = document.getElementById('select-sort');

// main Shop state
let mainShopItemsArr = [];
let sortMainShopItemsArr = [];
let sortFilter = [];
let selectSortItem = ['Nerusiuota', 'Kaina A-Z', 'Kaina Z-A'];
// Pirminis selecto appendinimas
selectSortItem.forEach((el) => {
    const optEl = document.createElement('option');
    optEl.textContent = el;
    selectSort.append(optEl);
});

// pagrindinis veiksmas
getProducts().then((items) => makeShopItemsList(items));

// event listeners
sortPriceBtnAscEl.addEventListener('click', (e) => {
    if (e.target.textContent.indexOf('ASC') === -1) {
        e.target.textContent = 'Sort by price ASC';
        // makeShopItemsList(
        //     mainShopItemsArr.sort((a, b) => {
        //         return Number(b.price) - Number(a.price);
        //     })
        // );
        sortFilter = desc();
    } else {
        e.target.textContent = 'Sort by price DESC';
        // makeShopItemsList(
        //     mainShopItemsArr.sort((a, b) => {
        //         return Number(a.price) - Number(b.price);
        //     })
        // );
        sortFilter = asc();
    }
});

sortPriceBtnEl.addEventListener('click', () => {
    makeShopItemsList(
        mainShopItemsArr.sort((a, b) => {
            return Number(b.price) - Number(a.price);
        })
    );
});

searchElBtn.addEventListener('click', (e) => {
    inputSearch();
});

searchEl.addEventListener('input', (e) => {
    if (!searchCh.checked) return;
    inputSearch();
});

selectSort.addEventListener('click', (e) => {
    //console.log(typeof sortMainShopItemsArr);
    if (typeof sortMainShopItemsArr !== 'object') {
        // if (sortMainShopItemsArr.length !== 0) {
        //       console.log('geras');
        sortMainShopItemsArr = mainShopItemsArr;
    }
    const val = e.target.value;
    let sortFilter = sortMainShopItemsArr;
    if (val === 'Nerusiuota') {
        sortFilter = makeShopItemsList(sortMainShopItemsArr);
    }
    if (val === 'Kaina A-Z') {
        sortFilter = asc();
        // sortFilter = makeShopItemsList(
        //     sortMainShopItemsArr.sort((a, b) => {
        //         return Number(a.price) - Number(b.price);
        //     })
        // );
    }
    if (val === 'Kaina Z-A') {
        sortFilter = desc();
        // sortFilter = makeShopItemsList(
        //     sortMainShopItemsArr.sort((a, b) => {
        //         return Number(b.price) - Number(a.price);
        //     })
        // );
    }
    if (
        val === "women's clothing" ||
        val === "men's clothing" ||
        val === 'jewelery' ||
        val === 'electronics'
    ) {
        //        console.log('ok1');

        sortFilter = sortMainShopItemsArr
            .filter((el) => el.category === val)
            .sort((a, b) => Number(b.price) - Number(a.price));
        makeShopItemsList(sortFilter);
    }
    sortMainShopItemsArr = sortFilter;
});

// funkcijos

function asc() {
    return makeShopItemsList(
        mainShopItemsArr.sort((a, b) => {
            return Number(a.price) - Number(b.price);
        })
    );
}

function desc() {
    return makeShopItemsList(
        mainShopItemsArr.sort((a, b) => {
            return Number(b.price) - Number(a.price);
        })
    );
}

function inputSearch() {
    //   console.log(sortMainShopItemsAr);
    // if (sortMainShopItemsArr.length !== 0) {
    //     mainShopItemsArr = sortMainShopItemsArr;
    // }
    //mainShopItemsArr = sortMainShopItemsAr;
    const searchElVal = searchEl.value.trim();
    //console.log(searchElVal);
    const search = mainShopItemsArr.filter((shObj) =>
        shObj.title.toLowerCase().includes(searchElVal.toLowerCase())
    );
    sortMainShopItemsArr = search;
    //   console.log(search);
    makeShopItemsList(sortMainShopItemsArr);
}

async function getProducts() {
    const resp = await fetch(url);
    const dataInJS = await resp.json();
    //    console.log('dataInJS ===', dataInJS);
    mainShopItemsArr = dataInJS;
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
            selectSortItem.indexOf(mainShopItemsArr[i].category) === -1 &&
            mainShopItemsArr[i] !== ''
        ) {
            selectSortItem.push(mainShopItemsArr[i].category);
            const liEl = document.createElement('option');
            liEl.textContent = mainShopItemsArr[i].category;
            selectSort.append(liEl);
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
    <button>More info</button>
  </div>
  `;
    return divEl;
}