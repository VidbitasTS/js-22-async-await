{
    return;
    let url = 'https://fakestoreapi.com/products';

    let queryParams = new URLSearchParams(window.location.search);
    //const currentProductId = getParam(queryParams.get('id'));
    const contEl = document.querySelector('.container');

    //console.log('currentProductId ===', currentProductId);

    // function getParam(val) {
    //     return '/' + val;
    // }

    // async function data(shopObj) {
    //     const resp = await fetch(shopObj);
    //     const dataJs = await resp.json();
    //     console.log('dataJs ===', dataJs);
    //     makeOneCard(dataJs);
    // }

    /**
     * Returs query param from URL
     * @param {string} param
     * @returns param value
     * getParam('id');
     */
    function getParam(param) {
        let queryParams = new URLSearchParams(window.location.search);
        return queryParams.get(param);
    }

    const currentProductId = getParam('id');

    function makeOneCard(shopObj1) {
        // pagaminam ir grazinam viena item
        // img, price, title, category
        contEl.innerHTML = '';
        const divEl = document.createElement('div');
        divEl.className = 'shop-item card';
        divEl.innerHTML = `
  <img src="${shopObj1.image}" alt="preke">
  <h3>${shopObj1.title}</h3>
  <p class="price">€${shopObj1.price.toFixed(2)}</p>
  <p>Category: ${shopObj1.category}</p>
  <p>Description: ${shopObj1.description}</p>
  <div class="control">
    <button class="buy-btn">Buy</button>
    <a href="index.html">Back</a>
  </div>
  `;
        contEl.append(divEl);
    }
    console.log('url + currentProductId ===', url + currentProductId);
    data(url + currentProductId);
}