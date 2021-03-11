const api_key = process.env.API_KEY;
const MOVIE_DB_ENDPOINT = 'http://api.themoviedb.org/3/search/movie?api_key=146e2e585bf1f3f8c3a01f3d02ef066b&query=spiderman';
const MOVIE_DB_IMAGE_ENDPOINT = 'https://image.tmdb.org/t/p/w500';
const DEFAULT_POST_IMAGE = 'https://via.placeholder.com/150';

function requestMovies(url, onComplete, onError) {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log('Data: ', data);
        })
        .catch((error) => {
            console.log('Error: ', error);
        });
}

function generateMovieDBUrl(path) {
    const url = `${MOVIE_DB_ENDPOINT}/3${path}?api_key=${MOVIE_DB_API}`;
    return url;
}


function getTopRatedMovies() {
    const url = generateMovieDBUrl(`/movie/top_rated`);
    const render = renderMovies.bind({ title: 'Top Rated Movies' })
    requestMovies(url, render, handleGeneralError);
}

function getTrendingMovies() {
    const url = generateMovieDBUrl('/trending/movie/day');
    const render = renderMovies.bind({ title: 'Trending Movies' })
    requestMovies(url, render, handleGeneralError);
}


function searchUpcomingMovies() {
    const url = generateMovieDBUrl('/movie/upcoming');
    const render = renderMovies.bind({ title: 'Upcoming Movies' })
    requestMovies(url, render, handleGeneralError);
}

function searchPopularMovie() {
    const url = generateMovieDBUrl('/movie/popular');
    const render = renderMovies.bind({ title: 'Popular Movies' });
    requestMovies(url, render, handleGeneralError);
}

// Invoke a different function for search movies
function searchMovie(value) {
    const url = generateMovieDBUrl('/search/movie') + '&query=' + value;
    requestMovies(url, renderSearchMovies, handleGeneralError);
}


function getVideosByMovieId(movieId, content) {
    const url = generateMovieDBUrl(`/movie/${movieId}/videos`);
    const render = createVideoTemplate.bind({ content });
    requestMovies(url, render, handleGeneralError);
}