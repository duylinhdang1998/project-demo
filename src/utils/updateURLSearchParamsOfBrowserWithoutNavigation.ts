export const updateURLSearchParamsOfBrowserWithoutNavigation = (searchParams: URLSearchParams) => {
  const newUrl = [window.location.pathname, searchParams.toString()].filter(Boolean).join('?');
  window.history.replaceState(null, '', newUrl);
};
