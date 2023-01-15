import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPlaylists } from "../../lib/api";

export const loader = async ({ params }: LoaderArgs) => {
  const playLists = await getPlaylists();
  return json(playLists.find(({ id }) => id === params.id));
};

export default function Playlist() {
  const { title, owner, links } = useLoaderData<typeof loader>();
  return (
    <div>
      Title: {title}
      <br />
      Owner: {owner}
      <br />
      Links : {links.map((link) => `"${link}"`).join(", ")}
    </div>
  );
}
