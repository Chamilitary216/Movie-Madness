
const api_key = "146e2e585bf1f3f8c3a01f3d02ef066b";
const url = 'http://api.themoviedb.org/3/search/movie?api_key=146e2e585bf1f3f8c3a01f3d02ef066b';
const imgURL = "https://image.tmdb.org/t/p/w500/"

const buttonElement = document.querySelector("#search");
const inputElement = document.querySelector("#inputValue");
const movieSearch = document.querySelector("#movie-search")

function movieSection (movies) {
    return movies.map((movie) => {
        return `
        <img src=${imgURL + movie.poster_path} data-movie-id = ${movie.id}/>
        `;
    })
}

function createMovieContainer(movies) {
    const movieElement = document.createElement("div");
    movieElement.setAttribute("class", "movie");
    
    const movieTemplate = `
        <section class = "section">
            ${movieSection(movies)}
        </section>
        <div class = "content">
             <p id = "content-close">X</p>
        </div>
    `;

    movieElement.innerHTML = movieTemplate;
    return movieElement
}
buttonElement.onclick = function (event) {
    event.preventDefault();
    const value = inputElement.value;

    const newUrl = url + "&query=" + value;

    fetch (newUrl)
    .then((res) => res.json())
    .then((data) => {
        const movies = data.results;
        const movieBlock = createMovieContainer(movies);
        movieSearch.appendChild(movieBlock)
        console.log ("Data: ", data);
    })
    .catch((error) => {
        console.log("Erro: ", error);
    });
    console.log("Value: ", value);
}