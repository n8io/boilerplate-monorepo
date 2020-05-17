import jwtDecode from 'jwt-decode';

const decode = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    // Do nothing
    return null;
  }
};

export { decode };
