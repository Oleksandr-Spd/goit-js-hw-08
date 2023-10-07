import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const LS_KEY = 'videoplayer-current-time';
const player = new Player('vimeo-player');
const currentTime = localStorage.getItem(LS_KEY);

function setItemLS({ seconds }) {
  localStorage.setItem(LS_KEY, seconds);
}

player.on('timeupdate', throttle(setItemLS, 1000));

player
  .setCurrentTime(currentTime)
  .then(function (seconds) {
    console.log('Час було встановлено на', seconds, 'секунд');
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;

      default:
        break;
    }
  });
