import io from 'socket.io-client';

const socket = io('ws://192.168.18.10:3000');

export default socket;
