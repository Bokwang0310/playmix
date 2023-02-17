import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import type { Music } from "~/lib/api";
import { getYoutubeVideoIdFromUrl } from "~/lib/utils";

const ChipTab = styled(Tab)({
  textTransform: "none",
  backgroundColor: "#e0e0e0",
  borderRadius: "16px",
  minWidth: 0,
  minHeight: 0,
  height: "24px",
  fontSize: "0.8125rem",
  whiteSpace: "nowrap",
  marginRight: "4px",
  fontFamily: "Roboto",
});

type Props = {
  musics: Music[];
  value: number;
  onChangeWithValue: (index: number) => void;
};

export default function ({ musics, value, onChangeWithValue }: Props) {
  return (
    <nav>
      <Tabs
        value={value}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          alignItems: "center",
          minHeight: "0px",
          padding: "16px 16px 0px 16px",
        }}
        TabIndicatorProps={{ hidden: true }}
        onChange={(_, value) => onChangeWithValue(value)}
      >
        {musics.map(({ title, url }, index) => (
          <ChipTab key={getYoutubeVideoIdFromUrl(url)} label={title} />
        ))}
      </Tabs>
    </nav>
  );
}
