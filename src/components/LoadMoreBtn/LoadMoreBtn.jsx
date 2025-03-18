import css from './LoadMoreBtn.module.css';
const LoadMoreBtn = ({ onClick, pages, totalPages }) => {
  return (
    <button className={css.btn} type="button" onClick={onClick}>
      Load more{' '}
      <span className={css.span}>
        page {pages}\{totalPages}
      </span>
    </button>
  );
};
export default LoadMoreBtn;
