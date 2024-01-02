import { Low } from "lowdb";
import { JSONFile } from "lowdb/lib/adapters/node/JSONFile";

export type Music = {
  id: string;
  title: string;
  url: string; // 유니크 한 값이니까
};

export type Playlist = {
  id: string;
  owner: string;
  musics: Music[];
  title: string;
  description: string;
};

type Data = {
  playlists: Playlist[];
};

const adapter = new JSONFile<Data>("../db/db.json");
const defaultData: Data = { playlists: [] };
const db = new Low(adapter, defaultData);

const getPlaylists = async () => {
  await db.read();
  return db.data.playlists;
};

const createPlaylist = async (newPlaylist: Playlist) => {
  await db.read();
  db.data.playlists.push(newPlaylist);
  await db.write();
  await db.read(); // 꼭 해야 하는지 확인
  return db.data.playlists;
};

const deletePlaylist = async (id: string) => {};

const updatePlaylist = async (
  id: string,
  title: string,
  description: string,
  musics: Music[]
) => {};

// 리스트 내부 음악에 대한 CRUD
const getMusic = async (id: string, musicId: string) => {};
