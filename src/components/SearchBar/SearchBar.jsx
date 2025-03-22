import css from './SearchBar.module.css';
import { FcSearch } from 'react-icons/fc';

const SearchBar = ({ onSubmit }) => {
  return (
    <div className={css.container}>
      <form className={css.form} onSubmit={onSubmit}>
        <input
          className={css.input}
          type="text"
          name="search"
          autoComplete="on"
          autoFocus
          placeholder="Search movies"
        />
        <button className={css.btn} type="submit">
          <FcSearch size="40" />
        </button>
      </form>
    </div>
  );
};
export default SearchBar;
