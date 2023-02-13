import { useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

import AddIcon from "@mui/icons-material/Add";

import Header from "~/components/Header";

export default function () {
  const [count, setCount] = useState(3);

  return (
    <main>
      <Header />
      <List subheader={<ListSubheader>General Setting</ListSubheader>}>
        <ListItem>
          <TextField
            id="playlist-name"
            variant="standard"
            label="제목"
            fullWidth
          />
        </ListItem>
        <ListItem>
          <TextField
            id="playlist-description"
            variant="standard"
            multiline
            maxRows={4}
            label="설명"
            fullWidth
          />
        </ListItem>
        <List
          subheader={
            <ListSubheader>
              Music List
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </ListSubheader>
          }
        >
          {[...Array(count)]
            .map((_, index) => index + 1)
            .map((i) => (
              <ListItem
                key={i}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  id={`song-name-${i}`}
                  variant="standard"
                  label={`${i}번 곡 이름`}
                  sx={{ width: "128px" }}
                />
                <TextField
                  id={`song-link-${i}`}
                  variant="standard"
                  label={`${i}번 곡 URL`}
                  sx={{ width: "240px" }}
                />
              </ListItem>
            ))}
        </List>
      </List>
    </main>
  );
}
