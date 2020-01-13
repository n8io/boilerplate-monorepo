// This variable is the only place that the access token is stored
let token = null;

const clear = () => {
  token = null;
};
const read = () => {
  return token;
};
const set = newToken => {
  token = newToken;
};

export const AccessToken = {
  clear,
  read,
  set,
};
