import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { getGalleryPhotos } from "./gallery.ts";

// Dossier temporaire rempli de fichiers vides
const folderWith = (files) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "galerie-"));
  for (const file of files) fs.writeFileSync(path.join(dir, file), "");
  return dir;
};

test("dossier absent : aucune photo", () => {
  assert.deepEqual(getGalleryPhotos(path.join(os.tmpdir(), "galerie-inexistante")), []);
});

test("garde les images, quelle que soit la casse de l'extension", () => {
  const dir = folderWith(["a.jpg", "b.JPEG", "c.png", "d.webp", "e.avif"]);
  assert.deepEqual(getGalleryPhotos(dir), [
    "/galerie/e.avif",
    "/galerie/d.webp",
    "/galerie/c.png",
    "/galerie/b.JPEG",
    "/galerie/a.jpg",
  ]);
});

test("ignore les fichiers cachés macOS sans avertir", (t) => {
  const warn = t.mock.method(console, "warn", () => {});
  const dir = folderWith([".DS_Store", "._coupe.jpg", "coupe.jpg"]);
  assert.deepEqual(getGalleryPhotos(dir), ["/galerie/coupe.jpg"]);
  assert.equal(warn.mock.callCount(), 0);
});

test("signale au build les formats non supportés (HEIC d'iPhone)", (t) => {
  const warn = t.mock.method(console, "warn", () => {});
  const dir = folderWith(["IMG_1234.HEIC", "notes.txt", "coupe.jpg"]);
  assert.deepEqual(getGalleryPhotos(dir), ["/galerie/coupe.jpg"]);
  assert.equal(warn.mock.callCount(), 1);
  assert.match(warn.mock.calls[0].arguments[0], /IMG_1234\.HEIC/);
});

test("les plus récentes d'abord (nom AAAA-MM-JJ-…)", () => {
  const dir = folderWith(["2026-01-05-degrade.jpg", "2026-10-20-barbe.jpg", "2025-12-31-coupe.jpg"]);
  assert.deepEqual(getGalleryPhotos(dir), [
    "/galerie/2026-10-20-barbe.jpg",
    "/galerie/2026-01-05-degrade.jpg",
    "/galerie/2025-12-31-coupe.jpg",
  ]);
});
