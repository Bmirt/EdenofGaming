import decode from "jwt-decode";

export function getCurrentUser() {
  try {
    const user = decode(localStorage.getItem("token"));
    return user;
  } catch (err) {
    return null;
  }
}

export function isAdmin() {
  try {
    const user = decode(localStorage.getItem("token"));
    return user.isAdmin;
  } catch (err) {
    return null;
  }
}

export function getJWT() {
  try {
    const token = localStorage.getItem("token");
    return token;
  } catch (err) {
    return null;
  }
}

export function storeToken(token) {
  localStorage.setItem("token", token);
}

export function logout() {
  localStorage.removeItem("token");
  window.location = "/login";
}

export default {
  storeToken,
  getCurrentUser,
  getJWT,
  logout
};
