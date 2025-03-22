import { useEffect, useState } from 'react';
import css from './MovieDetailsPage.module.css';
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { fetchMovieDetails } from '../../apiService/getAPI';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/ErrorMessage/ErrorMessage';
import BtnGoBack from '../../components/BtnGoBack/BtnGoBack';
import { clsx } from 'clsx';

const getLinkStyles = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

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
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getMovie();
  }, [movieId]);

  const goBack = () => {
    navigate(location.state?.from ?? '/');
  };

  if (!movie) return <Loader loading={loading} />;
  if (error) return <b>The resource you requested could not be found.</b>;

  return (
    <div className={css.movieDetailsContainer}>
      <BtnGoBack onClick={goBack} />
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
      <h2 className={css.text}>Additional information</h2>
      <hr></hr>
      <ul className={css.list}>
        <NavLink to="cast" className={getLinkStyles}>
          Cast
        </NavLink>
        <NavLink to="reviews" className={getLinkStyles}>
          Review
        </NavLink>
      </ul>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
