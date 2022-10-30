import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {
  Panel,
  PanelHeader,
  Avatar,
  Text,
} from '@vkontakte/vkui';

import { MoreCoins } from '../../assets/image';
import Navbar from '../../shared/navbar/Navbar';
import style from './Home.module.css';
import { APP_NAME } from '../../assets/constants/constants';
import MainButton from '../../shared/mainButton/MainButton';
import Motivator from './components/Motivator';

const Home = ({
  id, go, fetchedUser, amountCoins,
}) => (
  <Panel id={id}>
    <PanelHeader>{APP_NAME}</PanelHeader>
    <div className={cn(style['home-wrapper'])}>
      <div className={cn(style.home)}>
        <div className={cn(style['home-earned'])}>
          <Text className={cn(style['home-earned-count'])}>
            {amountCoins}
          </Text>
          <MoreCoins />
        </div>
        {fetchedUser && (
        <>
          <div className={cn(style['greetings-wrapper'])}>
            {fetchedUser.photo_200 ? (
              <Avatar src={fetchedUser.photo_200} className={cn(style.avatar)} size={80} />
            ) : null}
            <Text className={cn(style.greetings)}>
              {`Привет, ${fetchedUser.first_name}!`}
            </Text>
          </div>
          <Text className={cn(style.description)}>
            {'Играй, зарабатывай монеты и трать\n их на покупки в СберМегаМаркете!'}
          </Text>
          <div className={cn(style['motivator-wrapper'])}>
            <Motivator />
          </div>
        </>
        )}
        <div className={cn(style['start-game-button-wrapper'])}>
          <MainButton text="Начать игру" onClick={go} goTo="gameBoard" />
        </div>

        <div className={cn(style['navbar-container'])}>
          <Navbar id={id} go={go} />
        </div>
      </div>
    </div>
  </Panel>
);

Home.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
  amountCoins: PropTypes.string.isRequired,
};

export default Home;
