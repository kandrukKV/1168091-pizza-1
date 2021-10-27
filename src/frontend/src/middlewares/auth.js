import { Path } from "../common/constants";

export default function auth({ next, store, nextMiddleware }) {
  if (!store.state.auth.isAuth) {
    const token = store.$jwt.getToken();
    if (token) {
      store.dispatch("auth/initialUser");
    } else {
      next(Path.ROOT);
    }
  }
  return nextMiddleware();
}
