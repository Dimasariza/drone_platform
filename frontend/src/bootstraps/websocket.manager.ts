const sockets = new Map<string, WebSocket>()

export function registerSocket(
  key: string,
  socket: WebSocket
) {
  sockets.set(key, socket)
}

export function getSocket(key: string) {
  return sockets.get(key)
}

export function closeSocket(key: string) {
  const socket = sockets.get(key)

  if (socket) {
    socket.close()
    sockets.delete(key)
  }
}

export function closeAllSockets() {
  sockets.forEach((socket) => {
    socket.close()
  })

  sockets.clear()
}