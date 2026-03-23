
let currentPage = 1;
const limit = 3;
let totalItems = 0;

let buttonPrev = document.getElementById('button-Prev');
let buttonNext = document.getElementById('button-Next');
let mainContent = document.getElementsByClassName('main-content');
buttonNext.textContent = 'Next';
buttonPrev.textContent = 'Prev';

buttonPrev.addEventListener('click', () => {
    if (currentPage > 1) fetchPage(currentPage - 1);
})

buttonNext.addEventListener('click', () => {
    const totalPages = Math.ceil(totalItems / limit);
    if (currentPage < totalPages) fetchPage(currentPage + 1);
    console.log("ok")
})


function renderItems(items){
    mainContent[0].innerHTML = '';
    for (const obj of items) {
        let receiptBlock = document.createElement('div')
        receiptBlock.classList.add('receipt-block');
        let fullInfo = document.createElement('div');
        fullInfo.classList.add('full-info');
        let underImgBlock = document.createElement('div');
        underImgBlock.classList.add('under-img-block');
        let underImgObj1 = document.createElement('p');
        underImgObj1.textContent = `Calories: ${obj.caloriesPerServing}`;
        let underImgObj2 = document.createElement('p');
        underImgObj2.textContent = `Prepearing time: ${obj.cookTimeMinutes}min`;
        underImgBlock.append(underImgObj1,underImgObj2);

        let receiptTitle = document.createElement('h4');
        receiptTitle.textContent = obj.name;
        let image = document.createElement('img');
        image.classList.add('receipt-image');
        image.src = obj.image;
        let ingredientsBlock = document.createElement('div');
        ingredientsBlock.classList.add('ingredients-block');


        for (const ingredient of obj.ingredients) {
            let ingredientObj = document.createElement('p');
            ingredientObj.classList.add('ingredient');
            ingredientObj.textContent = ingredient;
            ingredientsBlock.appendChild(ingredientObj);
        }

        let instructionsBlock = document.createElement('div');
        instructionsBlock.classList.add('instructions-block');
        let count = 1;
        for (const instruction of obj.instructions) {
            let instructionObj = document.createElement('p');

            instructionObj.classList.add('instruction');
            instructionObj.innerHTML = `${count}. ${instruction}`;
            instructionsBlock.appendChild(instructionObj);
            count++;
        }


        let tagsBlock = document.createElement('div');
        tagsBlock.classList.add('tags-block');
        for (const tag of obj.tags) {
            let p = document.createElement('p');
            p.textContent = tag;
            tagsBlock.appendChild(p);
        }

        fullInfo.append(underImgBlock, receiptTitle, ingredientsBlock,instructionsBlock, tagsBlock);
        receiptBlock.append(image, fullInfo);
        mainContent[0].appendChild(receiptBlock);
    }
}

function updatePagination(){
    const totalPages = Math.ceil(totalItems / limit);

    buttonPrev.disabled = (currentPage === 1);
    buttonNext.disabled = (currentPage === totalPages || totalPages === 0);
}


async function fetchPage(page) {
    currentPage = page;
    let url = new URL('https://dummyjson.com/recipes');
    const skip = (currentPage - 1) * limit;
    url.searchParams.set('skip', skip);
    url.searchParams.set('limit', limit);

    try{
        const response = await fetch(url);
        const data = await response.json();
        totalItems = data.total;
        renderItems(data.recipes);
        updatePagination();
    }
    catch(err){
        console.error(err);
    }
}


fetchPage(1);