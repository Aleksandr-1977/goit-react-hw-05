import css from './BtnGoBack.module.css';

const BtnGoBack = ({ onClick }) => {
  return (
    <button onClick={onClick} className={css.backButton}>
      Go Back
    </button>
  );
};
export default BtnGoBack;
