import io from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3210';

let socket: any = null;

export const initializeSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    socket.on('connect', () => {
      console.log('✓ WebSocket connected');
    });

    socket.on('disconnect', () => {
      console.log('✗ WebSocket disconnected');
    });
  }

  return socket;
};

export const subscribeToChannel = (channel: string, callback: (data: any) => void) => {
  const socket = initializeSocket();
  socket.emit('subscribe', { channel });
  socket.on(channel, callback);
};

export const unsubscribeFromChannel = (channel: string) => {
  if (socket) {
    socket.emit('unsubscribe', { channel });
    socket.off(channel);
  }
};

export const getSocket = () => {
  return socket || initializeSocket();
};
