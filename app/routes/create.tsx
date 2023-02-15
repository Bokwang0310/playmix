import { useState, useRef } from "react";
import { useActionData, Form, useSubmit } from "@remix-run/react";
import type { ActionArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import Header from "~/components/Header";
// import type { Playlist } from "~/lib/api";
import { nanoid } from "nanoid";
import {
  validateTitle,
  validateDescription,
  validateMusicTitles,
  validateUrls,
} from "~/lib/utils";

export async function action({ request }: ActionArgs) {
  const body = await request.formData();

  const title = body.get("title");
  const description = body.get("description");
  const musicTitles = body.getAll("musicTitle");
  const urls = body.getAll("url");

  const formErrors = {
    title: validateTitle(title),
    description: validateDescription(description),
    musicTitles: validateMusicTitles(musicTitles),
    urls: validateUrls(urls),
  };

  const data = {
    id: nanoid(),
    title,
    description,
    owner: "owner",
    // TODO: 여기 최적화
    musics: musicTitles.map((title, index) => ({
      title,
      url: urls[index],
    })),
  };

  if (Object.values(formErrors).some(Boolean))
    return json({ formErrors, data });

  return redirect("/create");
}

export default function () {
  // 플레이리스트에 넣으려는 음악의 개수
  const [count, setCount] = useState(3);
  const submit = useSubmit();
  const formRef = useRef<HTMLFormElement>(null);
  const actionData = useActionData<typeof action>();

  return (
    <main>
      <Header
        title="Create"
        leftIcon={<CloseIcon />}
        rightIcon={<ArrowForwardIosIcon />}
        leftLink="/"
        rightOnClick={() => submit(formRef.current, { replace: true })}
      />
      <Form ref={formRef} method="post">
        <List subheader={<ListSubheader>General Setting</ListSubheader>}>
          <ListItem>
            <TextField
              error={actionData?.formErrors.title ? true : false}
              id="playlist-name"
              variant="standard"
              label="제목"
              name="title"
              fullWidth
              defaultValue={actionData?.data.title}
              helperText={actionData?.formErrors.title}
            />
          </ListItem>
          <ListItem>
            <TextField
              error={actionData?.formErrors.description ? true : false}
              id="playlist-description"
              variant="standard"
              multiline
              maxRows={4}
              label="설명"
              name="description"
              fullWidth
              defaultValue={actionData?.data.description}
              helperText={actionData?.formErrors.description}
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
            {[...Array(count)].map((_, i) => (
              <ListItem
                key={i}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  error={actionData?.formErrors.musicTitles[i] ? true : false}
                  id={`song-name-${i}`}
                  variant="standard"
                  label={`${i + 1}번 곡 제목`}
                  sx={{ width: "128px" }}
                  name="musicTitle"
                  defaultValue={actionData?.data.musics[i].title}
                  helperText={actionData?.formErrors.musicTitles[i]}
                />
                <TextField
                  error={actionData?.formErrors.urls[i] ? true : false}
                  id={`song-link-${i}`}
                  variant="standard"
                  label={`${i + 1}번 곡 URL`}
                  sx={{ width: "240px" }}
                  name="url"
                  defaultValue={actionData?.data.musics[i].url}
                  helperText={actionData?.formErrors.urls[i]}
                />
              </ListItem>
            ))}
          </List>
        </List>
      </Form>
    </main>
  );
}
