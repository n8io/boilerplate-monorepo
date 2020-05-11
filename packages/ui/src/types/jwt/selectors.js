import jwtDecode from 'jwt-decode';

const decode = (token) => jwtDecode(token);

export { decode };
