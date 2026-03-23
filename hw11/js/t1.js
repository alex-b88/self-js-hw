let mainContainer = document.getElementById("mainContainer");

//const itemsPerPage = 4;
/*
let url = new URL("https://dummyjson.com/carts");
url.searchParams.set("limit", `${itemsPerPage}`);


fetch(url)
.then(res => res.json())
.then((res) =>{
    //console.log(res);
    /*for (const obj of res.carts) {
        let oneCardContainer = document.createElement('div');
        oneCardContainer.classList.add('oneCardContainer');

        let topSection = document.createElement('div');
        topSection.classList.add('topSection');
        topSection.innerHTML = `<h4>Order: </h4><span class="order-id">${obj.id}</span>`;
        oneCardContainer.appendChild(topSection);

        let goodsTable = document.createElement('table');
        goodsTable.classList.add('goodsTable');
        let thead = document.createElement('thead');
        let tr = document.createElement('tr');
        let goodImage = document.createElement('th');
        goodImage.classList.add('head-table-good-image');
        goodImage.innerHTML = `Image`;
        let goodTitle = document.createElement('th');
        goodTitle.classList.add('head-table-good-title');
        goodTitle.innerHTML = `Title`;
        let goodPrice = document.createElement('th');
        goodPrice.classList.add('head-table-good-price');
        goodPrice.innerHTML = `Price`;
        let goodQuantity = document.createElement('th');
        goodQuantity.classList.add('head-table-good-quantity');
        goodQuantity.innerHTML = `Quantity`;
        let goodTotal = document.createElement('th');
        goodTotal.classList.add('head-table-good-total');
        goodTotal.innerHTML = `Total`;
        tr.append(goodImage, goodTitle, goodPrice, goodQuantity, goodTotal);
        thead.appendChild(tr);
        goodsTable.appendChild(thead);

        let tBody = document.createElement('tbody');

        for (const product of obj.products) {
            let trBody = document.createElement('tr');
            let tdImage = document.createElement('td');
            tdImage.classList.add('body-table-good-image');
            tdImage.innerHTML = `<img src="${product.thumbnail}" alt="${product.title}" class="image-in-table">`;
            let tdTitle = document.createElement('td');
            tdTitle.classList.add('body-table-good-title');
            tdTitle.innerHTML = `${product.title}`;
            let tdPrice = document.createElement('td');
            tdPrice.classList.add('body-table-good-price');
            tdPrice.innerHTML = `${product.price}`;
            let tdQuantity = document.createElement('td');
            tdQuantity.classList.add('body-table-good-quantity');
            tdQuantity.innerHTML = `${product.quantity}`;
            let tdTotal = document.createElement('td');
            tdTotal.classList.add('body-table-good-total');
            tdTotal.innerHTML = `${product.total.toFixed(2)}`;

            trBody.append(tdImage, tdTitle, tdPrice, tdQuantity, tdTotal);
            tBody.appendChild(trBody);
        }
        goodsTable.appendChild(tBody);

        oneCardContainer.appendChild(goodsTable);

        let totalBlock = document.createElement('div');
        totalBlock.classList.add('total-line');
        totalBlock.innerHTML = `<p><span>Products: </span><span>${obj.totalProducts}</span></p><p><span>Quantity: </span>${obj.totalQuantity}<span></span></p><p><span>Summe: </span><span>${obj.total}</span></p>`;
        oneCardContainer.appendChild(totalBlock);
        mainContainer.appendChild(oneCardContainer);

        //pagination
        let buttonPrev = document.getElementById('button-Prev');
        let buttonNext = document.getElementById('button-Next');
        buttonPrev.innerHTML = 'Prev';
        buttonNext.innerHTML = 'Next';


    }
});
*/

let currentPage = 1;
const limit = 4;
let totalItems = 0;

function renderItems(res){
    mainContainer.innerHTML = '';
    for (const obj of res) {
        let oneCardContainer = document.createElement('div');
        oneCardContainer.classList.add('oneCardContainer');

        let topSection = document.createElement('div');
        topSection.classList.add('topSection');
        topSection.innerHTML = `<h4>Order: </h4><span class="order-id">${obj.id}</span>`;
        oneCardContainer.appendChild(topSection);

        let goodsTable = document.createElement('table');
        goodsTable.classList.add('goodsTable');
        let thead = document.createElement('thead');
        let tr = document.createElement('tr');
        let goodImage = document.createElement('th');
        goodImage.classList.add('head-table-good-image');
        goodImage.innerHTML = `Image`;
        let goodTitle = document.createElement('th');
        goodTitle.classList.add('head-table-good-title');
        goodTitle.innerHTML = `Title`;
        let goodPrice = document.createElement('th');
        goodPrice.classList.add('head-table-good-price');
        goodPrice.innerHTML = `Price`;
        let goodQuantity = document.createElement('th');
        goodQuantity.classList.add('head-table-good-quantity');
        goodQuantity.innerHTML = `Quantity`;
        let goodTotal = document.createElement('th');
        goodTotal.classList.add('head-table-good-total');
        goodTotal.innerHTML = `Total`;
        tr.append(goodImage, goodTitle, goodPrice, goodQuantity, goodTotal);
        thead.appendChild(tr);
        goodsTable.appendChild(thead);

        let tBody = document.createElement('tbody');

        for (const product of obj.products) {
            let trBody = document.createElement('tr');
            let tdImage = document.createElement('td');
            tdImage.classList.add('body-table-good-image');
            tdImage.innerHTML = `<img src="${product.thumbnail}" alt="${product.title}" class="image-in-table">`;
            let tdTitle = document.createElement('td');
            tdTitle.classList.add('body-table-good-title');
            tdTitle.innerHTML = `${product.title}`;
            let tdPrice = document.createElement('td');
            tdPrice.classList.add('body-table-good-price');
            tdPrice.innerHTML = `${product.price}`;
            let tdQuantity = document.createElement('td');
            tdQuantity.classList.add('body-table-good-quantity');
            tdQuantity.innerHTML = `${product.quantity}`;
            let tdTotal = document.createElement('td');
            tdTotal.classList.add('body-table-good-total');
            tdTotal.innerHTML = `${product.total.toFixed(2)}`;

            trBody.append(tdImage, tdTitle, tdPrice, tdQuantity, tdTotal);
            tBody.appendChild(trBody);
        }
        goodsTable.appendChild(tBody);

        oneCardContainer.appendChild(goodsTable);

        let totalBlock = document.createElement('div');
        totalBlock.classList.add('total-line');
        totalBlock.innerHTML = `<p><span>Products: </span><span>${obj.totalProducts}</span></p><p><span>Quantity: </span>${obj.totalQuantity}<span></span></p><p><span>Summe: </span><span>${obj.total}</span></p>`;
        oneCardContainer.appendChild(totalBlock);
        mainContainer.appendChild(oneCardContainer);
    }
}

function updatePagination(){
    const totalPages = Math.ceil(totalItems / limit);

    let buttonPrev = document.getElementById('button-Prev');
    let buttonNext = document.getElementById('button-Next');
    buttonPrev.innerHTML = 'Prev';
    buttonNext.innerHTML = 'Next';

    // Блокировка кнопок на границах
    buttonPrev.disabled = (currentPage === 1);
    buttonNext.disabled = (currentPage === totalPages || totalPages === 0);
}

    document.getElementById('button-Prev').onclick = () => {
        if (currentPage > 1) fetchPage(currentPage - 1);
    }

    document.getElementById('button-Next').onclick = () => {
        const totalPages = Math.ceil(totalItems / limit);
        if (currentPage < totalPages) fetchPage(currentPage + 1);
    }

async function fetchPage(page) {
    currentPage = page;
    let url = new URL("https://dummyjson.com/carts");
    url.searchParams.set("limit", limit);
    const skip = (currentPage - 1) * limit;
    url.searchParams.set("skip", skip);
    try{
        const response = await fetch(url);
        const res = await response.json();
        totalItems = res.total;
        renderItems(res.carts);
        updatePagination();

    }
    catch(error){
        console.error("Error fetching page: ", error);
    }
}


fetchPage(1);