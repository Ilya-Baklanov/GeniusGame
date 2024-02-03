import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const usePreloadImage = (pictures) => {
  const [imageCount, setImageCount] = useState(0);

  useEffect(() => {
    pictures.forEach((picture) => {
      const img = new Image();
      img.src = picture;

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
