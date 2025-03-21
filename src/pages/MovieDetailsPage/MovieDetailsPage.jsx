import { useEffect, useState } from 'react';
import css from './MovieDetailsPage.module.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../../apiService/getAPI';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/ErrorMessage/ErrorMessage';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) {
      setError(true);
      return;
    }

    async function getMovie() {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getMovie();
  }, [movieId]);

  const goBack = () => {
    navigate(location.state?.from ?? '/movies');
  };

  if (loading) return <Loader loading={loading} />;
  if (error) return <Error />;
  if (!movie) return <p>Movie not found</p>;

  return (
    <div className={css.movieDetailsContainer}>
      <button onClick={goBack} className={css.backButton}>
        Go Back
      </button>

      <div className={css.movieInfo}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://via.placeholder.com/300x450'
          }
          alt={movie.title}
          className={css.moviePoster}
        />

        <div className={css.movieText}>
          <h1>
            {movie.title} ({movie.release_date?.slice(0, 4)})
          </h1>
          <p>
            <strong>User Score:</strong> {Math.round(movie.vote_average * 10)}%
          </p>
          <p>
            <strong>Overview:</strong> {movie.overview}
          </p>
          <p>
            <strong>Genres:</strong>{' '}
            {movie.genres?.map(genre => genre.name).join(', ') ||
              'No genres available'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
