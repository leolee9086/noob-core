export function normalize(name) {
  if (normalizeNeedlessNames.includes(name)) {
    return name;
  } else {
  }
  if (!name.startsWith("custom-")) {
    return "cutom-" + name;
  } else {
    return name;
  }
}

export const normalizeNeedlessNames = [
  "style",
  "data-export-markdown",
  "fold",
  "memo",
  "heading-fold",
  "bookmark",
];
