import { useEffect, useState } from 'react';
import css from './HomePage.module.css';
import { fetchTranding } from '../../apiService/getAPI';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/ErrorMessage/ErrorMessage';

const HomePage = () => {
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getTranding() {
      try {
        setIsError(false);
        setLoading(true);
        const data = await fetchTranding(page);
        setMovie(() => [...data.results]);
      } catch {
        setIsError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getTranding();
  }, [page]);

  return (
    <>
      <h1 className={css.title}>Trending today:</h1>
      {loading && <Loader loading={loading} />}
      {error && <Error />}
      {movie.length > 0 && <MovieList movie={movie} />}
    </>
  );
};
export default HomePage;
