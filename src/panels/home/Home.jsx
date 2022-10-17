import React from 'react';
import PropTypes from 'prop-types';

import {
  Panel,
  PanelHeader,
  Avatar,
  Text,
} from '@vkontakte/vkui';

import { MoreCoins } from '../../assets/image';
import Navbar from '../../shared/navbar/Navbar';
import './Home.css';
import { APP_NAME } from '../../assets/constants/constants';
import MainButton from '../../shared/mainButton/MainButton';
import Motivator from './components/Motivator';

const Home = ({
  id, go, fetchedUser, amountCoins,
}) => (
  <Panel id={id}>
    <PanelHeader>{APP_NAME}</PanelHeader>
    <div className="home-wrapper">
      <div className="home">
        <div className="home-earned">
          <Text className="home-earned-count">
            {amountCoins}
          </Text>
          <MoreCoins />
        </div>
        {fetchedUser && (
        <>
          <div className="greetings-wrapper">
            {fetchedUser.photo_200 ? (
              <Avatar src={fetchedUser.photo_200} className="avatar" size={80} />
            ) : null}
            <Text className="greetings">
              {`Привет, ${fetchedUser.first_name}!`}
            </Text>
          </div>
          <Text className="description">
            Играй, зарабатывай монеты и трать их на покупки в СберМегаМаркете!
          </Text>
          <div className="motivator-wrapper">
            <Motivator />
          </div>
        </>
        )}
        <div className="start-game-button-wrapper">
          <MainButton text="Начать игру" onClick={go} goTo="gameBoard" />
        </div>

        <div className="navbar-container">
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
