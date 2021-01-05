import { APP_DEFAULT_USER_IMAGE } from "../../config/appConfig";
/**
 * @description Retorna la URL de la imagen de un usuario
 */
export const getUserImage = (user, profile = null, addDefault = true) => {
  let imageURL = null;
  if (user && user.image && user.image.path) {
    imageURL = user.image.path;
  }

  if (!imageURL && profile && profile.image && profile.image.path) {
    imageURL = profile.image.path;
  }

  if (imageURL) return `/${imageURL}`;

  if (!addDefault) return null;

  return APP_DEFAULT_USER_IMAGE;
};
