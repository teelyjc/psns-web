export const Routes = {
  Home: "/",
  SignIn: "/signin",
  SignUp: "/signup",
  Preferences: "/preferences",
};

export const ApiRoutes = {
  SignIn: "/signin",
  SignUp: "/signup",
  SignOut: "/signout",
  Authenticate: "/auth/me",
  Pets: "/pets",
  UpdateUserById: (id: string) => {
    return `/users/${id}`;
  },
};

export const Keys = {
  CurrentUser: "current-user",
};
