const heartbeat = (_req, res) =>
  res.json({ message: 'ok', timestamp: new Date() });

export { heartbeat };
