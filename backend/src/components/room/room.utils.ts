export const generateRandomRoomId = (length = 6) => Math.random().toString(20).substr(2, length);
