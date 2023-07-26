const productLink = window.sessionStorage.getItem("productLinkShopeeReviews")
const loading = document.querySelector(".loading")
const dataContainer = document.getElementById('data-container');


function extractShopeeIds(url) {
    const regex = /i\.(\d+)\.(\d+)/;
    const match = url.match(regex);

    if (match && match.length === 3) {
        const shopid = match[1];
        const productId = match[2];
        return { shopid, productId };
    } else {
        return null;
    }
}

function removeReview(event) {
    const article = event.target.closest('article');

    dataContainer.style.overflow = "hidden"
    article.classList.add('removing');

    setTimeout(() => {
        article.remove();

        dataContainer.style.overflow = "auto"
    }, 300);

}

async function getReviews(ids) {
    const proxyCors = "https://corsproxy.io/?"
    const apiUrl = `https://shopee.com.br/api/v2/item/get_ratings?itemid=${ids.productId}&limit=20&shopid=${ids.shopid}`

    try {
        const response = await fetch(proxyCors + apiUrl);

        if (!response.ok) {
            throw new Error('Erro na solicitação');
        }

        const data = await response.json();

        data.data.ratings.map((rating) => {
            const article = `
              <article class="review">
                    <button class="closeButton">
                        <img src="../../../img/close.png" alt="fechar">
                    </button>
                <div class="textContent">
                  <h1>${rating.author_username}</h1>
                  <p>${rating.comment}</p>
                </div>
                <div class="imageContent">
                  ${rating.images.map((image) => {
                return `<img src='https://down-lum-br.img.susercontent.com/${image}'
                                alt="reviewImage">`;
            }).join('')}
            
                </div>
                <div class="stars starsReview">
                    <span class="material-symbols-outlined">
                        star
                    </span>
                    <span class="material-symbols-outlined">
                        star
                    </span>
                    <span class="material-symbols-outlined">
                        star
                    </span>
                    <span class="material-symbols-outlined">
                        star
                    </span>
                    <span class="material-symbols-outlined">
                        star
                    </span>
                </div>
              </article>`;

            loading.style.display = "none"
            dataContainer.insertAdjacentHTML("beforeend", article);
        });
        const closeButtons = document.querySelectorAll(".closeButton")

        for (const button of closeButtons) {
            button.addEventListener("click", (event) => {
                removeReview(event)
            })
        }


    } catch (error) {
        const dataContainer = document.getElementById('data-container');
        dataContainer.innerHTML = 'Erro: ' + error.message;
    }
}

if (productLink !== null) {
    const ids = extractShopeeIds(productLink)
    getReviews(ids)
}
else {
    dataContainer.innerHTML = 'Desculpe, parece que algo não funcionou. Verifique se o link que você digitou é válido'
}
