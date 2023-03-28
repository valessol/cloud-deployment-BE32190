function messagesDTO(message, id, timestamp) {
  return {
    ...message,
    id,
    timestamp,
  };
}

export default messagesDTO;
