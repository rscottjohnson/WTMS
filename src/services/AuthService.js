import store from "../store";
import { http } from "./HttpService";

export function isLoggedIn() {
  const token = localStorage.getItem("token");
  return token != null;
}

export function login(user) {
  // endpoint url
  return http().post("/auth", user)
      // take the response, if there is one, set the token
      .then((res) => {
        if (res) {
          const fakeToken = {
            token: "my-token",
          }
          setToken(token);
        }
      });
}

function setToken(token) {
  localStorage.setItem("token", JSON.stringify(token));
  store.dispatch("authenticate");
}

export function getUsername() {
  return "username";
}

export function getUserId() {
  return 1;
}
