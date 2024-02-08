/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {
  Panel,
  PanelHeader,
  Avatar,
  Text,
  ScreenSpinner,
  Link,
} from '@vkontakte/vkui';

import { MainLogo, MoreCoins } from '../../assets/image';
import Navbar from '../../shared/navbar/Navbar';
import style from './Home.module.css';
import {
  APP_NAME,
  GAME_RULES,
  PROMOTION_RULES,
} from '../../assets/constants/constants';
import MainButton from '../../shared/mainButton/MainButton';
import Motivator from './components/Motivator';
import Timer from '../../shared/timer/Timer';

const Home = ({
  id,
  go,
  onStartGame,
  fetchedUser,
  amountCoins,
  gamesAvailable,
  isLoading,
  timeUntilNextGame,
  onEndedTimerUntilNextGame,
  isMobile,
  platform,
  placeInLeaderBoard,
}) => (
  <Panel id={id}>
    {!isMobile && <PanelHeader>{APP_NAME}</PanelHeader>}
    {isLoading ? (
      <ScreenSpinner size="large" />
    ) : (
      <div className={cn(style['home-wrapper'])}>
        <div className={cn(style.home, style[platform])}>
          <div className={cn(style['content-wrapper'])}>
            <div className={cn(style['game-block'])}>
              <div className={cn(style['game-block_header'])}>
                <div className={cn(style['game-block_logo'])}>
                  <MainLogo />
                </div>
                <div className={cn(style['game-block_picture'])}>
                  <img src="/img/Home_MainCards.png" alt="Home_MainCardsImage" />
                </div>
              </div>
              <div className={cn(style.motivator_wrapper)}>
                <Text className={cn(style.motivator_title)}>
                  {'Играй\nи покупай'}
                </Text>
                <Text className={cn(style.motivator_text)}>
                  {'Играй, зарабатывай монеты и трать\nих на покупки в Мегамаркете!'}
                </Text>
              </div>
              <div className={cn(style['start-game-button-wrapper'])}>
                {
                  gamesAvailable > 0
                    ? <MainButton text="Продолжить игру" onClick={onStartGame} isAnimated />
                    : (
                      <div className={cn(style['timer-until-next-game-wrapper'])}>
                        <Text className={cn(style['timer-until-next-game-text'])}>
                          {'до следующей\nигры осталось'}
                        </Text>
                        <Text className={cn(style['timer-until-next-game-time'])}>
                          <Timer time={timeUntilNextGame} onEndedTime={onEndedTimerUntilNextGame} />
                        </Text>
                      </div>
                    )
                  }
              </div>
            </div>
            <div className={cn(style['profile-and-promo-block'])}>
              <div className={cn(style.profile)}>
                <div className={cn(style.profile_wrapper)}>
                  {fetchedUser.photo_200 ? (
                    <Avatar
                      src={fetchedUser.photo_200}
                      className={cn(style.profile_avatar)}
                      size={34}
                      noBorder={true}
                    />
                  ) : null}
                  <div className={cn(style.profile_info)}>
                    <Text className={cn(style.profile_name)}>
                      {fetchedUser.first_name}
                    </Text>
                    <Text className={cn(style.profile_link)}>
                      link to profile
                    </Text>
                  </div>
                </div>
                <div className={cn(style['earned-coins'])}>
                  <MoreCoins />
                  <Text className={cn(style['earned-coins_count'])}>
                    {amountCoins}
                  </Text>
                  <Text className={cn(style['earned-coins_text'])}>
                    балла/ов
                  </Text>
                </div>
              </div>
              <div className={cn(style.promo)}>
                <div className={cn(style.promo_content)}>
                  <Text className={cn(style.promo_title)}>
                    Промокоды
                  </Text>
                  <div className={cn(style.promo_count_wrapper)}>
                    <Text className={cn(style.promo_count)}>
                      15
                    </Text>
                    <div className={cn(style.promo_count_additional_wrapper)}>
                      <Text className={cn(style.promo_count_additional)}>
                        +1
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={cn(style.rating_wrapper)}>
              <div className={cn(style.rating_main_info)}>
                <Text className={cn(style.rating_title)}>
                  Рейтинг
                </Text>
                <div className={cn(style.rating_numbers)}>
                  <Text className={cn(style.rating_position)}>
                    {placeInLeaderBoard.orderNumber}
                  </Text>
                  <Text className={cn(style.rating_total_members)}>
                    {`из ${placeInLeaderBoard.totalUsersCount}`}
                  </Text>
                </div>
              </div>
              <div className={cn(style.rating_list)}>
                <div className={cn(style.rating_list_item)}>
                  {fetchedUser.photo_200 ? (
                    <Avatar
                      src={fetchedUser.photo_200}
                      className={cn(style.rating_avatar)}
                      size={34}
                      noBorder={true}
                    />
                  ) : null}
                  <div className={cn(style.rating_list_item_info)}>
                    <Text className={cn(style.rating_name)}>
                      {fetchedUser.first_name}
                    </Text>
                    <div className={cn(style['rating_earned-coins'])}>
                      <MoreCoins />
                      <Text className={cn(style['rating_earned-coins_count'])}>
                        {amountCoins}
                      </Text>
                    </div>
                  </div>
                </div>
                <div className={cn(style.rating_list_item)}>
                  {fetchedUser.photo_200 ? (
                    <Avatar
                      src={fetchedUser.photo_200}
                      className={cn(style.rating_avatar)}
                      size={34}
                      noBorder={true}
                    />
                  ) : null}
                  <div className={cn(style.rating_list_item_info)}>
                    <Text className={cn(style.rating_name)}>
                      {fetchedUser.first_name}
                    </Text>
                    <div className={cn(style['rating_earned-coins'])}>
                      <MoreCoins />
                      <Text className={cn(style['rating_earned-coins_count'])}>
                        {amountCoins}
                      </Text>
                    </div>
                  </div>
                </div>
                <div className={cn(style.rating_list_item)}>
                  {fetchedUser.photo_200 ? (
                    <Avatar
                      src={fetchedUser.photo_200}
                      className={cn(style.rating_avatar)}
                      size={34}
                      noBorder={true}
                    />
                  ) : null}
                  <div className={cn(style.rating_list_item_info)}>
                    <Text className={cn(style.rating_name)}>
                      {fetchedUser.first_name}
                    </Text>
                    <div className={cn(style['rating_earned-coins'])}>
                      <MoreCoins />
                      <Text className={cn(style['rating_earned-coins_count'])}>
                        {amountCoins}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cn(style['navbar-container'])}>
            <Navbar id={id} go={go} />
          </div>
        </div>
      </div>
    )}
  </Panel>
);

Home.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  onStartGame: PropTypes.func,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
  amountCoins: PropTypes.string.isRequired,
  gamesAvailable: PropTypes.number,
  isLoading: PropTypes.bool,
  timeUntilNextGame: PropTypes.number,
  onEndedTimerUntilNextGame: PropTypes.func,
  isMobile: PropTypes.bool,
  platform: PropTypes.string,
  placeInLeaderBoard: PropTypes.shape({
    orderNumber: PropTypes.string,
    totalUsersCount: PropTypes.string,
    userId: PropTypes.string,
    vkToken: PropTypes.string,
  }),
};

export default Home;
