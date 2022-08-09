'use strict';
console.log('shop.js');

let url = 'https://fakestoreapi.com/products';
//url = 'data/prod.json';

// taikomes
const shopItemsEl = document.getElementById('shop-items');
//const sortPriceBtnEl = document.getElementById('sort-price');
//const apiPriceBtnEl = document.getElementById('sort-price-api');
const searchElBtn = document.getElementById('search-btn');
const searchEl = document.getElementById('search');
const searchCh = document.getElementById('search-сheck');
const selectSort = document.getElementById('select-sort');
const selectFilter = document.getElementById('select-filter');

// main Shop state
let mainShopItemsArr = [];
let sortMainShopItemsArr = [];
//let selectSortItem = ['Nerusiuota', 'Kaina A-Z', 'Kaina Z-A'];
// Pirminis selecto appendinimas
// selectSortItem.forEach((el, i) => {
//     const optEl = document.createElement('option');
//     optEl.textContent = el;
//     optEl.value = i.toString();
//     selectSort.append(optEl);
// });
let selectFilterItem = [];
let selecFiltertCount = 1;
let sortFilter;

// pagrindinis veiksmas
getProducts(url).then((items) => makeShopItemsList(items));

// event listeners

//apiPriceBtnEl.addEventListener('mousedown', async() => {
//'https://fakestoreapi.com/products?sort=desc'
//'https://fakestoreapi.com/products?sort=asc'
// let sorted;
// let ascDesc;
// let sortedParam;
// if (apiPriceBtnEl.textContent.toLowerCase().endsWith('asc')) {
//     apiPriceBtnEl.textContent = apiPriceBtnEl.textContent.replace(
//         'ASC',
//         'DESC'
//     );
//     ascDesc = 'ASC,DESC';
//     sortedParam = '?sort=desc';
//           sorted = await getProducts('https://fakestoreapi.com/products?sort=desc');
// } else {
//     apiPriceBtnEl.textContent = apiPriceBtnEl.textContent.replace(
//         'DESC',
//         'ASC'
//     );
//     ascDesc = 'DESC,ASC';
//     sortedParam = '?sort=asc';
//           sorted = await getProducts('https://fakestoreapi.com/products?sort=asc');
// }
//apiPriceBtnEl.textContent = apiPriceBtnEl.textContent.replace(ascDesc);
// sorted = await getProducts(url + sortedParam);
// console.log('url + sortedParam ===', url + sortedParam);
//    makeShopItemsList(sorted);
//});

// sortPriceBtnEl.addEventListener('click', () => {
//     makeShopItemsList(
//         mainShopItemsArr.sort((a, b) => {
//             return Number(b.price) - Number(a.price);
//         })
//     );
// });

searchElBtn.addEventListener('click', (e) => {
    inputSearch();
});

searchEl.addEventListener('input', (e) => {
    if (!searchCh.checked) return;
    inputSearch();
});

selectSort.addEventListener('click', (e) => {
    console.log(e.target.tagName, typeof sortMainShopItemsArr);
    //   console.log(typeof e.target.value);
    // if (sortMainShopItemsArr.length === 0) {
    //     console.log('geras');
    //     sortMainShopItemsArr = mainShopItemsArr;
    // }
    const val = e.target.value;
    sortFilter = sortMainShopItemsArr;
    if (val === '1') {
        sortFilter = makeShopItemsList(sortMainShopItemsArr);
    }
    if (val === '2') {
        sortFilter = makeShopItemsList(
            sortMainShopItemsArr.sort((a, b) => {
                return Number(a.price) - Number(b.price);
            })
        );
    }
    if (val === '3') {
        sortFilter = makeShopItemsList(
            sortMainShopItemsArr.sort((a, b) => {
                return Number(b.price) - Number(a.price);
            })
        );
    }
    sortMainShopItemsArr = sortFilter;
});

selectFilter.addEventListener('click', (e) => {
    if (sortMainShopItemsArr.length === 0) {
        sortMainShopItemsArr = mainShopItemsArr;
    }
    //  const val = e.target.value;
    //sortFilter = sortMainShopItemsArr;

    console.log('geras filtras', sortMainShopItemsArr);
    sortFilter = sortMainShopItemsArr.filter(
        (el) => el.category === e.target.value
    );
    console.log('geras filtras22223333333333', sortFilter);
    makeShopItemsList(sortFilter);
    sortMainShopItemsArr = sortFilter;
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
    console.log('dataInJS ===', dataInJS);
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
  </div>
  `;
    return divEl;
}