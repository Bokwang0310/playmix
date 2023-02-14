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
  currentIndex: number;
};

// TODO: Chip 클릭시 해당 음악으로 변경

export default function ({ musics, currentIndex }: Props) {
  return (
    <nav>
      <Tabs
        value={currentIndex}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          alignItems: "center",
          minHeight: "0px",
          padding: "16px 16px 0px 16px",
        }}
        // onChange={(_, value) => setValue(value)}
        TabIndicatorProps={{ hidden: true }}
      >
        {musics.map(({ title, url }) => (
          <ChipTab key={getYoutubeVideoIdFromUrl(url)} label={title} />
        ))}
      </Tabs>
    </nav>
  );
}
