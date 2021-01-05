export const redirect = (url) => {
  const newUrl = document.location.origin + url;
  location.replace(newUrl);
};
