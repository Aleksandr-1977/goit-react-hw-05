import css from './ImageModal.module.css';
import Modal from 'react-modal';

const ImageModal = ({
  modalIsOpen,
  closeModal,
  src,
  alt,
  goToNextImage,
  goToPreviousImage,
}) => {
  return (
    <Modal
      className={css.modal}
      overlayClassName={css.overlay}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      appElement={document.getElementById('root')}
    >
      <div className={css.modalContent}>
        <button className={css.prevButton} onClick={goToPreviousImage}>
          &#8592;
        </button>
        <img className={css.modalImg} src={src} alt={alt} />
        <button className={css.nextButton} onClick={goToNextImage}>
          &#8594;
        </button>
      </div>
    </Modal>
  );
};
export default ImageModal;
