const buttonElement = document.querySelector("#search");
const inputElement = document.querySelector("#inputValue");
const movieSearch = document.querySelector("#movie-search");
const movieContainer = document.querySelector("#movie-container")



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
    
}

function renderMovie(data) {
    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    movieContainer.appendChild(movieBlock)
    console.log ("Data: ", data);
}
// Function to search movies

function seekError(error) {
    console.log ("Error: ", error)
}

//Search Button onClick
buttonElement.onclick = function (event) {
    event.preventDefault();
    const value = inputElement.value;
    searchMovie(value);
    

    //Empties the search field after every search
    inputElement.value = "";
    console.log("Value: ", value);
}

// Create the iFrame
function createiFrame(video) {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.width = 340;
    iframe.height = 300;
    iframe.allowFullscreen = true;

    return iframe;

}

function createVideoTemp (data, content) {
    //Drops existings videos in container and adds new ones
    content.innerHTML = '<p id="content-close">X</p>';
    console.log("Videos: ", data)
                const videos = data.results;
                //Loops so we don't get more than 4 videos
                const length = videos.length > 4 ? 4 : videos.length;
                const iframeDiv = document.createElement ("div");

                for (let i = 0; i < videos.length; i++) {
                    const video = videos[i];
                    const iframe = createiFrame(video);
                    iframeDiv.appendChild(iframe);
                    content.appendChild(iframeDiv);

                }
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
            .then((data) => createVideoTemp(data, content))
             .catch((error) => {
              console.log("Error: ", error);
    });
    }

    if (target.id === "content-close") {
        const content = target.parentElement;
        content.classList.remove("content-display");
    }
}

upComingMovie();
popularMovie()