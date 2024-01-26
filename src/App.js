import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { useState } from "react";
import Logo from "./components/Logo";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import MovieList from "./components/MovieList";
import Box from "./components/Box";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";
import Loader from "./components/Loader";
import ErrorMsg from "./components/ErrorMsg";
import SelectedMovie from "./components/SelectedMovie";
import { useMovies } from "./custom-hooks/useMovies";
import { useLocalStorageState } from "./custom-hooks/useLocalStorageState";

// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=496feb47

// Click the following URL to activate your key: http://www.omdbapi.com/apikey.aspx?VERIFYKEY=78c74b5c-25e9-4ebe-8139-809ecd1933ac
// If you did not make this request, please disregard this email.

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // this useMovies custom hook returns an object and we are destructuring it here
  const { movies, loading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie(id) {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <div classname="container">
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {!movies.length && <h2 className="search-movie-h2">Search Movies</h2>}
          {loading && <Loader />}
          {!loading && !error && (
            <>
              <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
            </>
          )}

          {error && <ErrorMsg message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </div>
  );
}
