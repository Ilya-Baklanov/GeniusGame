import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const usePreloadImage = (pictures) => {
  const [imageCount, setImageCount] = useState(0);

  useEffect(() => {
    pictures?.forEach((picture) => {
      const img = new Image();
      img.src = picture;

      img.onerror = function (...args) {
        console.error('Error_load_picture: ', args[0], args[1], args[4]);

        setImageCount((prev) => (prev < pictures.length ? prev + 1 : prev));
      };

      img.onload = () => setImageCount((prev) => (prev < pictures.length ? prev + 1 : prev));
    });
  }, []);

  const downloadPercentage = Math.ceil((imageCount / pictures.length) * 100);

  return {
    isPicturesLoaded: imageCount === pictures.length,
    downloadPercentage,
  };
};

usePreloadImage.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default usePreloadImage;
