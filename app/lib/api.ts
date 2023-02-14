export type Music = {
  title: string;
  url: string;
};

export type Playlist = {
  id: string;
  owner: string;
  musics: Music[];
  title: string;
  description: string;
};

// 임시로 사용할 데이터
const playlists: Playlist[] = [
  {
    id: "025jpHTOHR5Mqs_lwOdOr",
    owner: "개죽이",
    musics: [
      { title: "매미들", url: "https://youtu.be/M2k4mNy61XI" },
      { title: "불세례", url: "https://youtu.be/w4iQ7nWO6SM" },
      { title: "Electra", url: "https://youtu.be/ooZA5ONfUJE" },
      { title: "Our Own Summer", url: "https://youtu.be/LwtgRAge4B4" },
    ],
    title: "검정치마의 여름",
    description: "밝고 짧게 타올라라",
  },
  {
    id: "Ov6KR2yrX6zHCB09dyMYc",
    owner: "망망이",
    musics: [
      {
        title: "달콤하고 빨갛고",
        url: "https://youtu.be/m9NHyrQvmv0",
      },
      {
        title: "하기 싫어",
        url: "https://youtu.be/354aC64tAsc",
      },
    ],
    title: "미노이와 고양이",
    description: "설명란을 선택적으로 작성할 수 있게 해야할까",
  },
];

export const tempPlaylist = playlists[0];

export const getPlaylists = async () =>
  new Promise<Playlist[]>((resolve) => resolve(playlists));
