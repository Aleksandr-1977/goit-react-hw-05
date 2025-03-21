import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movie }) => {
  const location = useLocation();
  return (
    <ul className={css.movieList}>
      {movie.map(trend => (
        <li key={trend.id} className={css.movielistitem}>
          <Link to={`/movies/${trend.id}`} state={location}>
            {trend.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default MovieList;
