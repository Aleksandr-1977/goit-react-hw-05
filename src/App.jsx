import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import { getImages } from './apiService/getAPI';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import Error from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [altDescription, setAltDescription] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = index => {
    setCurrentImageIndex(index);
    setModalImage(images[index].urls.regular);
    setAltDescription(images[index].alt_description);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const updateModalStateData = index => {
    setCurrentImageIndex(index);
    setModalImage(images[index].urls.regular);
    setAltDescription(images[index].alt_description);
  };

  const goToNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
      updateModalStateData(currentImageIndex + 1);
    }
  };

  const goToPreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
      updateModalStateData(currentImageIndex - 1);
    }
  };

  useEffect(() => {
    if (!query) return;

    async function handleSearch() {
      try {
        setIsError(false);
        setLoading(true);
        const data = await getImages(query, page);
        setTotalPages(data.total_pages);
        if (data.total === 0) {
          toast.error(
            'Извините, нет результатов, соответствующих вашему поисковому запросу. Попробуйте еще раз!'
          );
        } else {
          setImages(prevImages => [...prevImages, ...data.results]);
          if (page >= data.total_pages && page > 0) {
            toast('Сожалеем, но больше нет информации по Вашему запросу!');
          }
        }
      } catch {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    }
    handleSearch();
  }, [query, page]);

  const getQuery = image => {
    if (image === query) return;
    setQuery(image);
    setImages([]);
    setPage(1);
  };
  return (
    <>
      <SearchBar onSubmit={getQuery} />
      {loading && <Loader loading={loading} />}
      {isError && <Error />}
      {images.length > 0 && (
        <ImageGallery
          images={images}
          openModal={openModal}
          updateModalStateData={updateModalStateData}
        />
      )}
      {images.length > 0 && !loading && !isError && page < totalPages && (
        <LoadMoreBtn
          onClick={() => setPage(page + 1)}
          pages={page}
          totalPages={totalPages}
        />
      )}
      <ImageModal
        goToNextImage={goToNextImage}
        goToPreviousImage={goToPreviousImage}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        src={modalImage}
        alt={altDescription}
      />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            border: '1px solid rgb(45, 90, 236)',
            padding: '16px',
            color: '#00000',
          },
        }}
      />
    </>
  );
}

export default App;
