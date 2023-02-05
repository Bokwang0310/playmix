export type Playlist = {
  id: string;
  owner: string;
  urls: string[];
  title: string;
  description: string;
};

const playlists: Playlist[] = [
  {
    id: "025jpHTOHR5Mqs_lwOdOr",
    owner: "개죽이",
    urls: [
      "https://youtu.be/M2k4mNy61XI",
      "https://youtu.be/w4iQ7nWO6SM",
      "https://youtu.be/ooZA5ONfUJE",
      "https://youtu.be/LwtgRAge4B4",
    ],
    title: "검정치마의 여름",
    description: "밝고 짧게 타올라라",
  },
  {
    id: "Ov6KR2yrX6zHCB09dyMYc",
    owner: "망망이",
    urls: ["https://youtu.be/m9NHyrQvmv0", "https://youtu.be/354aC64tAsc"],
    title: "미노이와 고양이",
    description: "설명란을 선택적으로 작성할 수 있게 해야할까",
  },
];

export const getPlaylists = async () =>
  new Promise<Playlist[]>((resolve) => resolve(playlists));
