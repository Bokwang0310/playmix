import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
import { getPlaylists } from "../../lib/api";
import Player from "../../components/Player.client";

export const loader = async ({ params }: LoaderArgs) => {
  const playLists = await getPlaylists();
  return json(playLists.find(({ id }) => id === params.id));
};

export default function Playlist() {
  const { title, owner, links } = useLoaderData<typeof loader>();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      Title: {title}
      <br />
      Owner: {owner}
      <br />
      Links : {links.map((link) => `"${link}"`).join(", ")}
      <br />
      {mounted ? (
        <Player url="https://youtu.be/o8RiDh1jxck&origin=http://localhost:3000" />
      ) : null}
    </div>
  );
}
