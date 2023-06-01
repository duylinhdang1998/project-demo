import env from 'env';

export const getDomainName = () => {
  return env.isDevMode ? 'alibaba' : window.location.host.replace(env.baseCmsDomain, '');
};

export const getDomain = () => {
  return window.location.host;
};
