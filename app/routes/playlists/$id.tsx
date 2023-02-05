import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { styled } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";

import Player from "~/components/Player.client";
import ChipTabs from "~/components/ChipTabs";
import Playlists from "~/components/Playlists";
import ClientOnly from "~/components/ClientOnly";
import { getPlaylists } from "~/lib/api";

const tempPlaylist = {
  id: "025jpHTOHR5Mqs_lwOdOr",
  owner: "개죽이",
  links: [
    "https://youtu.be/M2k4mNy61XI",
    "https://youtu.be/w4iQ7nWO6SM",
    "https://youtu.be/ooZA5ONfUJE",
    "https://youtu.be/LwtgRAge4B4",
  ],
  title: "검정치마의 여름",
  description: "밝고 짧게 타올라라",
};

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

const PlayerContainer = styled("div")({
  position: "relative",
  paddingTop: "56.25%",
});

const PlayerSkeleton = styled(Skeleton)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
});

export default function Playlist() {
  const { playlists, currentPlaylist } = useLoaderData<typeof loader>();

  return (
    <>
      <PlayerContainer>
        <ClientOnly
          fallback={<PlayerSkeleton animation="wave" variant="rectangular" />}
        >
          {() => <Player url={currentPlaylist.links[0]} />}
        </ClientOnly>
      </PlayerContainer>
      <ChipTabs links={currentPlaylist.links} />
      <Playlists playlists={playlists} />
    </>
  );
}
