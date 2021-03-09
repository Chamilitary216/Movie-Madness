const buttonElement = document.querySelector ("#search");
const inputElement = document.querySelector ("#inputValue");

buttonElement.onclick = function(event) {
    event.preventDefault();
    const value = inputElement.value;

    fetch(url)
        .then

}