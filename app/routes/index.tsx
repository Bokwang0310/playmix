import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getPlaylists } from "../lib/api";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

export const loader = async () => {
  const playLists = await getPlaylists();
  return json(playLists);
};

export default function Index() {
  const playLists = useLoaderData<typeof loader>();

  console.log(playLists);

  return (
    <nav>
      {/*<ul>
        {playLists.map(({ id, title, description, owner }) => (
          <li key={id}>
            <Link to={`/playlists/${id}`}>
              Title: {title}, Owner: {owner}
            </Link>
            <br />
            Desc: {description}
          </li>
        ))}
        </ul>*/}
      {tempImages.map((image, index) => (
        <List
          sx={{
            width: "100%",
            // maxWidth: 360,
            bgcolor: "background.paper",
          }}
          key={index}
        >
          <ListItem alignItems="flex-start">
            <img
              src={`${image}?w=180&fit=crop&auto=format`}
              srcSet={`${image}?w=180&fit=crop&auto=format&dpr=2 2x`}
              loading="lazy"
              style={{ paddingRight: "8px" }}
            />
            <ListItemText
              style={{ paddingLeft: "8px" }}
              primary={`Musics ${index}`}
              secondary={
                <>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Author {index}
                  </Typography>
                  {` — Description for fake playlist and its number is ${index}`}
                </>
              }
            />
          </ListItem>
          <Divider variant="middle" component="li" />
        </List>
      ))}
    </nav>
  );
}

const tempImages = [
  "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
  "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
  "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
  "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
  "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
  "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
  "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
  "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
  "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
  "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
  "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
  "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
];
