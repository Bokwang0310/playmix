type PlayList = {
  id: string;
  owner: string;
  links: string[];
  title: string;
  description: string;
};

const playlists: PlayList[] = [
  {
    id: "1",
    owner: "1",
    links: ["1", "2", "3"],
    title: "1",
    description: "11111",
  },
  {
    id: "2",
    owner: "2",
    links: ["2", "1", "3"],
    title: "2",
    description: "22222",
  },
];

export const getPlaylists = async () =>
  new Promise<PlayList[]>((resolve) => resolve(playlists));
