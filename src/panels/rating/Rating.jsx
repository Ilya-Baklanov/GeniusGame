import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import CommonPanel from '../../shared/commonPanel/CommonPanel';
import GamersList from './components/GamersList';
import Switcher from './components/Switcher';
import useFetchFriendList from '../../shared/hooks/useFetchUserData/useFetchFriendList';

const Rating = ({
  id, go, amountCoins, accessToken, isLoading,
}) => {
  const gamersList = [
    { name: 'Александра Алекова', score: 19087, avatarSrc: 'https://sun7.userapi.com/sun7-15/s/v1/ig2/C1ohN6evNFyooY-IMGnQ8DBPUMVe6SCqeRDiZyXWUeXO899iCkrEUhEgwnrI4srp6n2fRrrZRwGL__FIwkFIX0WI.jpg?size=1440x2160&quality=95&type=album' },
    { name: 'Тима Емельянов', score: 15030, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
    { name: 'Сергей Хохлов', score: 10058, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
    { name: 'Руслан Гаджиев', score: 9543, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
    { name: 'Боня Жиглов', score: 8879, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
    { name: 'Маша Никонова', score: 7771, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
  ];

  const gamersList2 = useFetchFriendList(accessToken);

  const ratingSwitcherHandler = useCallback((e) => {
    const isFriendsRating = !e.target.checked;
    const isAllRating = e.target.checked;
  }, []);

  return (
    <CommonPanel
      id={id}
      go={go}
      amountCoins={amountCoins}
      title="Рейтинг"
      additionalBlock={(
        <Switcher onToggle={ratingSwitcherHandler} />
)}
      isLoading={isLoading}
    >
      <GamersList
        positionOnRating={1045}
        gamersOnRating={23576}
        gamersList={gamersList2}
      />
    </CommonPanel>
  );
};

Rating.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  amountCoins: PropTypes.string.isRequired,
  accessToken: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default Rating;
