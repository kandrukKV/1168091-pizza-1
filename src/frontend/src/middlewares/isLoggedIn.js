import { Path } from "../common/constants";

export default function isLoggedIn({ next, store, nextMiddleware }) {
  if (store.$jwt.getToken()) {
    next(Path.ROOT);
  }
  return nextMiddleware();
}
