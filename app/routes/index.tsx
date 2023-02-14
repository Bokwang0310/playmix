import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import Playlists from "~/components/Playlists";
import Header from "~/components/Header";

import { getPlaylists } from "~/lib/api";

export const loader = async () => {
  const playLists = await getPlaylists();
  // console.log(process.env.YT_DATA_API_KEY);
  return json(playLists);
};

export default function () {
  const playlists = useLoaderData<typeof loader>();

  return (
    <>
      <Header
        title="Playmix"
        leftIcon={<InfoIcon />}
        rightIcon={<AddIcon />}
        leftLink="https://github.com/Bokwang0310/playmix"
        rightLink="/create"
      />
      <Playlists playlists={playlists} />
    </>
  );
}
