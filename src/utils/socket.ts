import io from 'socket.io-client';

const socket = io('ws://10.0.2.2:3000');

export default socket;
