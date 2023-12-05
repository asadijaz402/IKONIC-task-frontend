// import { history } from "../../history";
// import { unProtectedRoutes } from "../../utility/unProtectedRoutes";

export function authHeader() {
  // const routes = history.location.pathname.split("/");

  // return authorization header with jwt token
  let token = localStorage.getItem("token");
  // if (routes.length === 4) token = routes[3];
  if (token) {
    var allowedOrigins = "*";
    var allow_headers =
      "Origin,X-Requested-With,Authorization,Content-Type,Accept";
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": allowedOrigins,
      "Access-Control-Allow-Methods": "PUT,GET,POST,DELETE,PATCH",
      "Access-Control-Allow-Headers": allow_headers,
      "WWW-Authenticate": "Basic",
      "Access-Control-Allow-Credentials": true,
    };
  }
}
