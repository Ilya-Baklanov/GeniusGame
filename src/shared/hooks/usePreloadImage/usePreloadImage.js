import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const usePreloadImage = (pictures) => {
  const [imageCount, setImageCount] = useState(pictures.length);

  useEffect(() => {
    pictures.forEach((picture) => {
      const img = new Image();
      img.src = picture;

      img.onload = () => setImageCount((prev) => prev - 1);
    });
  }, []);

  return !imageCount;
};

usePreloadImage.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default usePreloadImage;
