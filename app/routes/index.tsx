import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

import { getPlaylists } from "~/lib/api";

import Playlists from "~/components/Playlists";

export const loader = async () => {
  const playLists = await getPlaylists();
  // console.log(process.env.YT_DATA_API_KEY);
  return json(playLists);
};

export default function () {
  const playlists = useLoaderData<typeof loader>();

  return <Playlists playlists={playlists} />;
}
