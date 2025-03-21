import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import css from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import { fetchTranding } from '../../apiService/getAPI';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Error from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import AppHeader from '../AppHeader/AppHeader';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../../pages/HomePage/HomePage';
import MoviePage from '../../pages/MoviesPage/MoviesPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import MovieDetailsPage from '../../pages/MovieDetailsPage/MovieDetailsPage';

const App = () => {
  return (
    <div className={css.container}>
      <AppHeader />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/movies" element={<MoviePage />}></Route>
        <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </div>
  );
  //   const [query, setQuery] = useState('');
  //   const [page, setPage] = useState(1);
  //   const [images, setImages] = useState([]);
  //   const [loading, setLoading] = useState(false);
  //   const [isError, setIsError] = useState(false);
  //   const [totalPages, setTotalPages] = useState(1);

  //   useEffect(() => {
  //     if (!query) return;

  //     async function handleSearch() {
  //       try {
  //         setIsError(false);
  //         setLoading(true);
  //         const data = await fetchTranding(query, page);
  //         setTotalPages(data.total_pages);
  //         if (data.total === 0) {
  //           toast.error(
  //             'Извините, нет результатов, соответствующих вашему поисковому запросу. Попробуйте еще раз!'
  //           );
  //         } else {
  //           setImages(prevImages => [...prevImages, ...data.results]);
  //           if (page >= data.total_pages && page > 0) {
  //             toast('Сожалеем, но больше нет информации по Вашему запросу!');
  //           }
  //         }
  //       } catch {
  //         setIsError(true);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //     handleSearch();
  //   }, [query, page]);

  //   const getQuery = image => {
  //     if (image === query) return;
  //     setQuery(image);
  //     setImages([]);
  //     setPage(1);
  //   };
  //   return (
  //     <>
  //       <SearchBar onSubmit={getQuery} />
  //       {loading && <Loader loading={loading} />}
  //       {isError && <Error />}
  //       {images.length > 0 && (
  //         <ImageGallery
  //           images={images}
  //           openModal={openModal}
  //           updateModalStateData={updateModalStateData}
  //         />
  //       )}
  //       {images.length > 0 && !loading && !isError && page < totalPages && (
  //         <LoadMoreBtn
  //           onClick={() => setPage(page + 1)}
  //           pages={page}
  //           totalPages={totalPages}
  //         />
  //       )}
  //       <ImageModal
  //         goToNextImage={goToNextImage}
  //         goToPreviousImage={goToPreviousImage}
  //         modalIsOpen={modalIsOpen}
  //         closeModal={closeModal}
  //         src={modalImage}
  //         alt={altDescription}
  //       />
  //       <Toaster
  //         position="top-right"
  //         toastOptions={{
  //           style: {
  //             border: '1px solid rgb(45, 90, 236)',
  //             padding: '16px',
  //             color: '#00000',
  //           },
  //         }}
  //       />
  //     </>
  //   );
};

export default App;
