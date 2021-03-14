
const api_key = "146e2e585bf1f3f8c3a01f3d02ef066b";
const url = 'http://api.themoviedb.org/3/search/movie?api_key=146e2e585bf1f3f8c3a01f3d02ef066b';
const imgURL = "https://image.tmdb.org/t/p/w500/"

const buttonElement = document.querySelector("#search");
const inputElement = document.querySelector("#inputValue");
const movieSearch = document.querySelector("#movie-search");

//Creates a dynamic URL
function generateUrl(path) {
    const url = `http://api.themoviedb.org/3${path}?api_key=146e2e585bf1f3f8c3a01f3d02ef066b`;
    return url;
}


//grabs movie backdrop images to display
function movieSection (movies) {
    return movies.map((movie) => {
        if (movie.poster_path) {
        return `<img src=${imgURL + movie.poster_path}
        data-movie-id = ${movie.id}/>`;
        }
    })
}

function createMovieContainer(movies) {
    const movieElement = document.createElement("div");
    movieElement.setAttribute("class", "movie");
    
    const movieTemplate = `
        <section class = "section">
            ${movieSection(movies)}
        </section>
        <div class = "content content-display">
             <p id = "content-close">X</p>
        </div>
    `;
    // Adds the above template to movie div
    movieElement.innerHTML = movieTemplate;
    return movieElement
}

function renderSearchMovies(data) {
    movieSearch.innerHTML = "";
    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    movieSearch.appendChild(movieBlock)
    console.log ("Data: ", data);
}

//URL Search
buttonElement.onclick = function (event) {
    event.preventDefault();
    const value = inputElement.value;
    const path = "/search/movie";
    const newUrl = generateUrl(path) + "&query=" + value;;

    //gets movie data to add to the page
    fetch (newUrl)
    .then((res) => res.json())
    .then(renderSearchMovies)
    .catch((error) => {
        console.log("Erro: ", error);
    });

    //Empties the search field after every search
    inputElement.value = "";
    console.log("Value: ", value);
}

function createiFrame(video) {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.width = 340;
    iframe.height = 300;
    iframe.allowFullscreen = true;

    return iframe;

}

document.onclick = function(event) {
    const target = event.target;
    if (target.tagName.toLowerCase() === "img") {
        console.log("Hello World");
        console.log("event: ", event);
        //
        const movieId = target.dataset.movieId;
        console.log("Movie ID: ", movieId);
        const section = event.target.parentElement;
        const content = section.nextElementSibling;
        content.classList.add("content-display");

        const path = `/movie/${movieId}/videos`;
        const url = generateUrl(path);
         
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log("Videos: ", data)
                const videos = data.results;
                const length = videos.length > 4 ? 4 : videos.length;
                const iframeDiv = document.createElement ("div");

                for (let i = 0; i < videos.length; i++) {
                    const video = videos[i];
                    const iframe = createiFrame(video);
                    iframeDiv.appendChild(iframe);
                    content.appendChild(iframeDiv);

                }
            })
             .catch((error) => {
              console.log("Error: ", error);
    });
    }

    if (target.id === "content-close") {
        const content = target.parentElement;
        content.classList.remove("content-display");
    }
}