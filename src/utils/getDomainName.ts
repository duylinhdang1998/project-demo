import env from 'env';

export const getDomainName = () => {
  return env.isDevMode || window.location.host === 'http://169.254.213.73:5789'
    ? env.domainTest || 'demotbus'
    : window.location.host.replace(`.${env.baseCmsDomain}`, '');
};

export const getDomain = () => {
  return window.location.host;
};
