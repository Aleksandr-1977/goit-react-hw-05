import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css.gallerylist}>
      {images.map(({ id, alt_description, urls }, index) => (
        <li
          className={css.gallerycard}
          key={id}
          onClick={() => openModal(index)}
        >
          <ImageCard
            urls={urls}
            alt_description={alt_description}
            onClick={() => openModal(index)}
          />
        </li>
      ))}
    </ul>
  );
};
export default ImageGallery;
