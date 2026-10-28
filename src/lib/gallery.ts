import fs from "node:fs";
import path from "node:path";

const GALLERY_DIR = path.join(process.cwd(), "public", "galerie");
const IMAGE_FILE = /\.(jpe?g|png|webp|avif)$/i;

// Photos de la galerie, lues au build. Nommer les fichiers AAAA-MM-JJ-description.jpg :
// le tri par nom décroissant affiche les plus récentes en premier.
export function getGalleryPhotos(dir: string = GALLERY_DIR): string[] {
  if (!fs.existsSync(dir)) return [];

  // Fichiers cachés (.DS_Store, ._photo.jpg de macOS) : jamais affichés
  const files = fs.readdirSync(dir).filter((file) => !file.startsWith("."));

  const ignored = files.filter((file) => !IMAGE_FILE.test(file));
  if (ignored.length > 0) {
    console.warn(
      `Galerie : fichiers ignorés, formats acceptés jpg, png, webp, avif (convertir les HEIC d'iPhone en JPG) : ${ignored.join(", ")}`,
    );
  }

  return files
    .filter((file) => IMAGE_FILE.test(file))
    .sort()
    .reverse()
    .map((file) => `/galerie/${file}`);
}
