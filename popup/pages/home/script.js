const qtdReviews = document.querySelector("#qtdReviews")
const qtdReviewsValue = document.querySelector("#qtdReviewsValue")
const gender = document.querySelector("#gender")
const maleValue = document.querySelector("#maleValue")
const femaleValue = document.querySelector("#femaleValue")
const shopeeForm = document.querySelector("#shopeeForm")
const productLink = document.querySelector("#productLink")


qtdReviews.addEventListener("input", (event) => {
    const tempSliderValue = event.target.value;
    qtdReviewsValue.textContent = tempSliderValue;

    const progress = (tempSliderValue / qtdReviews.max) * 100;

    qtdReviews.style.background = `linear-gradient(to right, #cbcccc ${progress}%, #1d1f23 ${progress}%)`;
})

gender.addEventListener("input", (event) => {
    const calcFemaleValue = 222 - event.target.value;
    maleValue.textContent = event.target.value;
    femaleValue.textContent = calcFemaleValue

    const progress = (event.target.value / gender.max) * 100;

    gender.style.background = `linear-gradient(to right, #cbcccc ${progress}%, #4e4f53 ${progress}%)`;
})

shopeeForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const regex = /i\.(\d+)\.(\d+)/;
    const match = productLink.value.match(regex);

    if (!match)
        alert("Por favor, insira uma url válida da Shopee")
    else {
        sessionStorage.setItem("productLinkShopeeReviews", JSON.stringify(productLink.value))
        window.location = "/popup/pages/platforms/index.html"
    }
})