import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";

import Player from "~/components/Player";
import ChipTabs from "~/components/ChipTabs";
import Playlists from "~/components/Playlists";
import { getPlaylists, tempPlaylist } from "~/lib/api";

export const loader = async ({ params }: LoaderArgs) => {
  const { playlistId } = params;
  const musicIndex = Number(params.musicIndex);

  const playlists = await getPlaylists();

  // 지금은 반환에 포함되지 않지만 나중에 포함될 예정
  // TODO: 주어진 id에 해당하는 플리를 찾지 못한 경우 홈화면으로 리다이렉트 시키자
  const currentPlaylist =
    playlists.find(({ id }) => id === playlistId) ?? tempPlaylist;

  const musics = currentPlaylist.musics;
  const currentMusic = musics[musicIndex];

  return json({
    playlistId,
    musicIndex,
    playlists,
    musics,
    currentMusic,
  });
};

export default function () {
  const { playlistId, musicIndex, playlists, musics, currentMusic } =
    useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const currentUrl = `/playlists/${playlistId}`;

  const handleEnded = () => {
    if (musicIndex + 1 === musics.length) return navigate(`${currentUrl}/0`);
    return navigate(`${currentUrl}/${musicIndex + 1}`);
  };

  const changeCurrentMusicTo = (index: number) =>
    navigate(`${currentUrl}/${index}`);

  return (
    <>
      <Player url={currentMusic.url} handleEnded={handleEnded} />
      <ChipTabs
        value={musicIndex}
        musics={musics}
        onChangeWithValue={changeCurrentMusicTo}
      />
      <Playlists playlists={playlists} />
    </>
  );
}
