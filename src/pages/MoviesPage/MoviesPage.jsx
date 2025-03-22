import { useEffect, useState } from 'react';
import css from './MoviesPage.module.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useSearchParams } from 'react-router-dom';
import { fetchSearchMovie } from '../../apiService/getAPI';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/ErrorMessage/ErrorMessage';

const MoviePage = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!query) {
      setMovie(null);
      setError(false);
      setResult(false);
      return;
    }
    async function getMovie() {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchSearchMovie(query);
        console.log('query:', query);
        if (data.length === 0) {
          setResult(true);
        }
        setMovie(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getMovie();
  }, [query]);
  console.log('Movie:', movie);

  const handleSubmit = evt => {
    evt.preventDefault();
    const nextParams = new URLSearchParams(searchParams);

    nextParams.set('query', evt.target.search.value.trim());
    setSearchParams(nextParams);
    evt.target.reset();
  };
  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {loading && <Loader loading={loading} />}
      {error && <Error />}
      {movie && <MovieList movie={movie} />}
      {result && (
        <b>
          Sorry, there are no results matching your search query. Try again!
        </b>
      )}
    </>
  );
};
export default MoviePage;
