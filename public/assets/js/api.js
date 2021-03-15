const api_key = "146e2e585bf1f3f8c3a01f3d02ef066b";
const url = 'http://api.themoviedb.org/3/search/movie?api_key=146e2e585bf1f3f8c3a01f3d02ef066b';
const imgURL = "https://image.tmdb.org/t/p/w500/"


//Creates a dynamic URL
function generateUrl(path) {
    const url = `http://api.themoviedb.org/3${path}?api_key=146e2e585bf1f3f8c3a01f3d02ef066b`;
    return url;
}

// Request Movies
function requestMovies(url, onComplete, onError) {
    fetch(url)
    .then((res) => res.json())
    .then(onComplete)
    .catch(onError);
    
}

// Search Movie
function searchMovie(value) {
    const path = "/search/movie";
    const url = generateUrl(path) + "&query=" + value;
    requestMovies(url, renderSearchMovies, seekError);
}
