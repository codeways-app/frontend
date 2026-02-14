export const ROUTES = {
  home: {
    main: () => '/',
  },
  auth: {
    signIn: () => '/auth/sign-in',
    signUp: () => '/auth/sign-up',
    recover: () => '/auth/recover',
  },
  dashboard: {
    main: () => '/dashboard',
  },
  messages: {
    main: () => '/messages',
  },
  profile: {
    main: () => '/profile',
  },
};
