import { logFactory } from 'log/logFactory';

const debugLog = logFactory({
  method: 'shutdown',
  module: 'stop',
});

let isShuttingDown = false;

const shutdownCache = (cache) =>
  new Promise((resolve) => {
    debugLog(`🔌 Cache connection closing...`);
    cache && cache.client && cache.client.quit();

    debugLog(`🔌 Cache connection closed successfully`);

    resolve();
  }).catch(() => {
    // We don't care if it bombs out
  });

const shutdownDatabase = (connection) => {
  if (!connection) return;

  debugLog(`🔌 Database connection closing...`);

  connection
    .destroy()
    .catch(() => {
      // We don't care if it bombs out
    })
    .finally(() => debugLog(`🔌 Database connection closed successfully`));
};

const stop = async ({ cache, connection }) => {
  if (isShuttingDown) return;

  isShuttingDown = true;

  debugLog(`💥 App shutting down...`);

  await Promise.all([shutdownCache(cache), shutdownDatabase(connection)]);

  debugLog(`🏁 App shutdown successfully`);

  // eslint-disable-next-line no-process-exit
  process.exit(1);
};

const addListeners = ({ cache, connection }) => {
  const stopSignals = ['SIGHUP', 'SIGINT', 'SIGTERM'];

  stopSignals.map((signal) =>
    process.on(signal, () => stop({ cache, connection }))
  );
};

export { addListeners };
