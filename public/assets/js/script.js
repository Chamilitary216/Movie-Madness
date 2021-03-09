const buttonElement = document.querySelector("#search");
const inputElement = document.querySelector("#inputValue");

buttonElement.onclick = function (event) {
    event.preventDefault();
    const value = inputElement.value;
}

//on click event for movies
document.onclick = function (event) {
    log('Event: ', event);
    const { tagName, id } = event.target;
    if (tagName.toLowerCase() === 'img') {
        const movieId = event.target.dataset.movieId;
        const section = event.target.parentElement.parentElement;
        const content = section.nextElementSibling;
        content.classList.add('content-display');
        getVideosByMovieId(movieId, content);
    }

    if (id === 'content-close') {
        const content = event.target.parentElement;
        content.classList.remove('content-display');
    }
}

// Starting the Search
searchMovie(INITIAL_SEARCH_VALUE);
searchUpcomingMovies();
getTopRatedMovies();
searchPopularMovie();
getTrendingMovies();