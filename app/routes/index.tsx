import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getPlaylists } from "../lib/api";
import { getYoutubeThumbnailFromUrl } from "../lib/utils";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

export const loader = async () => {
  const playLists = await getPlaylists();
  // console.log(process.env.YT_DATA_API_KEY);
  return json(playLists);
};

export default function Index() {
  const playLists = useLoaderData<typeof loader>();

  return (
    <nav>
      {playLists.map(({ id, owner, links, title, description }) => {
        const thumbnail = getYoutubeThumbnailFromUrl(links[0]);

        return (
          <List sx={{ width: "100%", bgcolor: "background.paper" }} key={id}>
            <ListItemButton alignItems="flex-start">
              <img
                src={`${thumbnail}?&fit=crop&auto=format&dpr=2`}
                srcSet={`${thumbnail}?&fit=crop&auto=format&dpr=4 4x`}
                loading="lazy"
                style={{ paddingRight: "8px" }}
              />
              <ListItemText
                style={{ paddingLeft: "8px" }}
                primary={title}
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {owner}
                    </Typography>
                    {` — ${description}`}
                  </>
                }
              />
            </ListItemButton>
            <Divider variant="middle" component="li" />
          </List>
        );
      })}
    </nav>
  );
}
