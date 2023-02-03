const urlPrefix = [
  "https://youtu.be/",
  "https://www.youtube.com/embed/",
  "https://www.youtube.com/watch?v=",
];

export const getYoutubeVideoIdFromUrl = (url: string) =>
  urlPrefix.reduce((prev, curr) => prev.replace(curr, ""), url).split("&")[0];

export const getYoutubeThumbnailFromUrl = (url: string) =>
  `https://i.ytimg.com/vi/${getYoutubeVideoIdFromUrl(url)}/hqdefault.jpg`;
