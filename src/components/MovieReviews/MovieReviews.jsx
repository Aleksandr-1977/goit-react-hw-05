import css from './MovieReviews.module.css';
import { useParams } from 'react-router-dom';
import { fetchMovieRewiews } from '../../apiService/getAPI';
import Error from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import { useEffect, useState } from 'react';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({ results: [] });
  const [error, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getReviews() {
      try {
        setIsError(false);
        setLoading(true);
        const data = await fetchMovieRewiews(movieId);
        console.log(data);
        setMovie(data);
      } catch {
        setIsError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getReviews();
  }, [movieId]);

  return (
    <>
      {loading && <Loader loading={loading} />}
      {error && <Error />}
      {movie.results.length > 0 ? (
        <ul>
          {movie.results.map(res => (
            <li key={res.id} className={css.item}>
              <h1 className={css.author}>{res.author}</h1>
              <p className={css.content}>{res.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <b>We don't have any reviews for this movie</b>
      )}
    </>
  );
};
export default MovieReviews;
