import { Link } from "@remix-run/react";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import { getYoutubeThumbnailFromUrl } from "~/lib/utils";
import { Playlist } from "~/lib/api";

type Props = {
  playlists: Playlist[];
};

export default function Playlists({ playlists }: Props) {
  return (
    <nav>
      {playlists.map(({ id, owner, links, title, description }) => {
        const thumbnail = getYoutubeThumbnailFromUrl(links[0]);
        return (
          <List sx={{ width: "100%", bgcolor: "background.paper" }} key={id}>
            <ListItemButton
              alignItems="flex-start"
              component={Link}
              to={`/playlists/${id}`}
            >
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
