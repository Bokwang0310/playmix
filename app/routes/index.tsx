import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getPlaylists } from "../lib/api";

export const loader = async () => {
  const playLists = await getPlaylists();
  return json(playLists);
};

export default function Index() {
  const playLists = useLoaderData<typeof loader>();
  return (
    <nav>
      <ul>
        {playLists.map(({ id, title, description, owner }) => (
          <li key={id}>
            <Link to={`/playlists/${id}`}>
              Title: {title}, Owner: {owner}
            </Link>
            <br />
            Desc: {description}
          </li>
        ))}
      </ul>
    </nav>
  );
}
