const clusterBaseUrl = 'https://fakebook.revaturelabs.com';

export const environment = {
  production: true,
  baseUrls: {
    posts: clusterBaseUrl,
    notifications: clusterBaseUrl,
    profile: clusterBaseUrl,
    auth: clusterBaseUrl,
  },
  redirect_uri: clusterBaseUrl + '/auth-callback',
  post_logout_redirect_uri: clusterBaseUrl,
  silent_redirect_uri: clusterBaseUrl + '/silent-refresh.html'
};
