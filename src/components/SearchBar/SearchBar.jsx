import css from './SearchBar.module.css';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FcSearch } from 'react-icons/fc';

const SearchBar = ({ onSubmit }) => {
  const [images, setImages] = useState('');

  const handleChange = evt => {
    setImages(evt.target.value);
  };
  const handleSubmit = evt => {
    evt.preventDefault();
    if (!images.trim()) {
      toast.error('Введите критерий поиска');
    }
    onSubmit(images);
    setImages('');
  };
  return (
    <div className={css.container}>
      <header className={css.header}>
        <form className={css.form} onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            // name="images"
            value={images}
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button className={css.btn} type="submit">
            <FcSearch size="40" />
          </button>
        </form>
      </header>
      <Toaster
        position="top-right"
        toastOptions={{
          className: '',
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
        }}
      />
    </div>
  );
  resetForm(images);
};
export default SearchBar;
