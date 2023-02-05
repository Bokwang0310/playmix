import { useState } from "react";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import Player from "~/components/Player";
import ChipTabs from "~/components/ChipTabs";
import Playlists from "~/components/Playlists";
import { getPlaylists, tempPlaylist } from "~/lib/api";

export const loader = async ({ params }: LoaderArgs) => {
  const playlists = await getPlaylists();

  // TODO: 주어진 id에 해당하는 플리를 찾지 못한 경우 제대로 핸들링
  const currentPlaylist =
    playlists.find(({ id }) => id === params.id) ?? tempPlaylist;

  return json({
    playlists,
    currentPlaylist,
  });
};

export default function () {
  const { playlists, currentPlaylist } = useLoaderData<typeof loader>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleEnded = () =>
    setCurrentIndex((prev) => {
      // 마지막 곡이 끝나면 처음으로 다시 돌아감
      if (prev + 2 === playlists.length) return 0;
      return prev + 1;
    });

  return (
    <>
      <Player
        url={currentPlaylist.urls[currentIndex]}
        handleEnded={handleEnded}
      />
      <ChipTabs currentIndex={currentIndex} urls={currentPlaylist.urls} />
      <Playlists playlists={playlists} />
    </>
  );
}
