import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from '../../apiService/getAPI';
import Error from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import css from './MovieCast.module.css';
import { useEffect, useState } from 'react';

const MovieCast = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({ cast: [] });
  const [error, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getCast() {
      try {
        setIsError(false);
        setLoading(true);
        const data = await fetchMovieCredits(movieId);
        console.log(data);
        setMovie(data);
      } catch {
        setIsError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getCast();
  }, [movieId]);

  if (movie.cast.length === 0) return <b>No cast information available.</b>;
  return (
    <>
      {loading && <Loader loading={loading} />}
      {error && <Error />}
      <ul className={css.cast}>
        {movie.cast.map(cast => (
          <li key={cast.id} className={css.item}>
            <div>
              <p className={css.name}>{cast.name}</p>
              <img
                src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                width={250}
                alt={cast.name}
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
export default MovieCast;
