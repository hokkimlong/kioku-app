import io from 'socket.io-client';
import appConfig from '~/config/app-config.json';

const socket = io(appConfig.socketURL);

export default socket;
