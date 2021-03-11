
const api_key = "146e2e585bf1f3f8c3a01f3d02ef066b";
const url = 'http://api.themoviedb.org/3/search/movie?api_key=146e2e585bf1f3f8c3a01f3d02ef066b';

const buttonElement = document.querySelector("#search");
const inputElement = document.querySelector("#inputValue");

buttonElement.onclick = function (event) {
    event.preventDefault();
    const value = inputElement.value;

    const newUrl = url + "&query=" + value;

    fetch (newUrl)
    .then((res) => res.json())
    .then((data) => {
        console.log ("Data: ", data);
    })
    .catch((error) => {
        console.log("Erro: ", error);
    });
    console.log("Value: ", value);
}