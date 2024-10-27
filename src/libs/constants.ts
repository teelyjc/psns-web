export const Routes = {
  Home: "/",
  SignIn: "/auth/signin",
  SignUp: "/auth/signup",
  Preferences: "/settings/preferences",
  Users: "/admin/users",
};

export const ApiRoutes = {
  SignUp: "/users/signup",
  SignIn: "/auth/signin",
  SignOut: "/auth/signout",
  Authenticate: "/auth/me",
  Pets: "/pets",
  UpdateUserById: (id: string) => {
    return `/users/${id}`;
  },
};

export const Keys = {
  CurrentUser: "current-user",
  Users: "all-users",
};
