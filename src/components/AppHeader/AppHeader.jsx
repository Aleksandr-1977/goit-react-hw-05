import clsx from 'clsx';
import css from './AppHeader.module.css';
import { NavLink } from 'react-router-dom';

const getLinkStyles = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};
const AppHeader = () => {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <ul className={css.list}>
          <NavLink to="/" className={getLinkStyles}>
            Home
          </NavLink>
          <NavLink to="/movies" className={getLinkStyles}>
            Movies
          </NavLink>
        </ul>
      </nav>
    </header>
  );
};
export default AppHeader;
