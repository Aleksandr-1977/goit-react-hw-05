import css from './ImageCard.module.css';

const ImageCard = ({ alt_description, urls, onClick }) => {
  return (
    <div className={css.card} onClick={onClick}>
      <img className={css.cardImage} src={urls.small} alt={alt_description} />
    </div>
  );
};
export default ImageCard;
