import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getPlaylists } from "../lib/api";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
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
      {tempYTImgs.map((image, index) => (
        <List sx={{ width: "100%", bgcolor: "background.paper" }} key={index}>
          <ListItemButton alignItems="flex-start">
            <img
              src={`${image}&fit=crop&auto=format`}
              srcSet={`${image}&fit=crop&auto=format&dpr=2 2x`}
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
          </ListItemButton>
          <Divider variant="middle" component="li" />
        </List>
      ))}
    </nav>
  );
}

const tempYTImgs = [
  "https://i.ytimg.com/vi/FioeL1LIJiU/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAIhCGAHYAQHiAQYIHRgGIAE=&rs=AOn4CLCXBAuPyxW98aCRNY5OcC5CfaM9eQ",
  "https://i.ytimg.com/vi/RTbIijlydPE/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAIhCGAHYAQHiAQYIHRgGIAE=&rs=AOn4CLDU80eA32yAwiFlk-zGTBhN9EDFRA",
  "https://i.ytimg.com/vi/ZrgbG7exGtM/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAIhCGAHYAQHiAQYIHRgGIAE=&rs=AOn4CLCEYiLq9BJM9fqukKLqRiio3jPoyQ",
  "https://i.ytimg.com/vi/kpaumYCEwp8/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAIhCGAHYAQHiAQYIHRgGIAE=&rs=AOn4CLDYnlujNUVfhwyAnZO7KRzR6fkwEQ",
  "https://i.ytimg.com/vi/irXoGwjhjg4/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAIhCGAHYAQHiAQYIHRgGIAE=&rs=AOn4CLBZE2jpc2B4AhtMM7yFhGPoEQlHCQ",
  "https://i.ytimg.com/vi/Uj-HiUUfAT8/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAVdR8d-fy1ZokHCI6qCHHR4oqKNg",
  "https://i.ytimg.com/vi/EKdsshckN1E/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAIhCGAHYAQHiAQYIHRgGIAE=&rs=AOn4CLDhch7nIBhfLxi8MroFRCXKMT5m6g",
  "https://i.ytimg.com/vi/mYveBG4Jis0/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAIhCGAHYAQHiAQYIHRgGIAE=&rs=AOn4CLB00TNtL-chizmfXZv2feIJfZQxvw",
];
