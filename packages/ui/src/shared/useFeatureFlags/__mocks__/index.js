export const useFeatureFlags = () => ({
  isReady: true,
  read: jest
    .fn()
    .mockName('fetchFlag')
    .mockImplementation(() => null),
  readAll: jest
    .fn()
    .mockName('fetchFlags')
    .mockImplementation(() => []),
});
