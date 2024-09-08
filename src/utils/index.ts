export const setUrlUsernameParam = (userId: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set("username", userId);
  window.history.pushState({}, "", url);
};
