const search = document.getElementById("search");
const input = document.getElementById("input");
const box = document.getElementById("box")
const api ='https://api.coingecko.com/api/v3/coins/';



search.addEventListener("submit",datas)


function datas(e){
    let coin = input.value.trim().toLowerCase();
    fetch(api+coin)
    .then(res => res.json())
    .then(data =>  {
        if(data.id == coin){
            loader();
            setTimeout(() => {
                let image = data.image.large;
                let name = data.name;
                let priceTry = data.market_data.current_price.try;
                let priceUsd = data.market_data.current_price.usd;

                addToUI(image,name,priceTry,priceUsd)
            }, 1000);
        }
        else{
            errorUI()
        }

    })
    input.value = ""
    e.preventDefault()
}

function addToUI(image,name,priceTry,priceUsd){
    box.innerHTML = `
    <div class="w-28">
        <img src="${image}" alt="">
    </div>
    <div class="w-28 ml-5 leading-8">
        <div>
            <h1 class="text-bc font-bold">${name}</h1>
        </div>
        <div>
            <p>₺ ${priceTry}</p>
            <p>$ ${priceUsd}</p>
        </div>
    </div>`
}
function errorUI(){
    box.innerHTML = `
            <div class="bg-red-500 text-slate-50 flex items-center px-5 rounded-lg">
              <p>Lütfen geçerli bir coin ismi girin</p>
            </div>
    `

    setTimeout(() => {
        box.innerHTML = ""
    }, 2000);
}

function loader(){
    box.innerHTML = `
    <img src="loading.svg" alt="">
    `
}