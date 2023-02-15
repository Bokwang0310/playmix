const urlPrefix = [
  "https://youtu.be/",
  "https://www.youtube.com/embed/",
  "https://www.youtube.com/watch?v=",
];

export const getYoutubeVideoIdFromUrl = (url: string) =>
  urlPrefix.reduce((prev, curr) => prev.replace(curr, ""), url).split("&")[0];

export const getYoutubeThumbnailFromUrl = (url: string) =>
  `https://i.ytimg.com/vi/${getYoutubeVideoIdFromUrl(url)}/hqdefault.jpg`;

export const validateTitle = (title: FormDataEntryValue | null) => {
  if (!title) return "제목을 입력해 주세요";
};

// TODO: 옵셔널하게 만듭시다.
export const validateDescription = (description: FormDataEntryValue | null) => {
  if (!description) return "설명을 입력해 주세요";
};

const validateMusicTitle = (musicTitle: FormDataEntryValue | null) => {
  if (!musicTitle) return "제목을 입력해 주세요";
};

export const validateMusicTitles = (musicTitles: FormDataEntryValue[]) => {
  return musicTitles.map(
    (musicTitle) => validateMusicTitle(musicTitle) || undefined
  );
};

const validateUrl = (url: FormDataEntryValue | null) => {
  if (typeof url !== "string") return "URL은 문자열이어야 합니다";
  if (!url) return "URL을 입력해 주세요";
  if (!validateYouTubeUrl(url)) return "유튜브 URL이 아닙니다";
};

const validateYouTubeUrl = (url: string) => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length == 11 ? true : false;
};

export const validateUrls = (urls: FormDataEntryValue[]) => {
  return urls.map((url) => validateUrl(url) || undefined);
};
