import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

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
  urls: string[];
  currentIndex: number;
};

// TODO: 각 link마다 yt data api로 영상 제목을 받아와서 chip의 label로 사용
// 또는 사용자에게 곡 이름을 입력하도록?

export default function Chips({ urls, currentIndex }: Props) {
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
        {urls.map((url, index) => (
          <ChipTab key={getYoutubeVideoIdFromUrl(url)} label={index} />
        ))}
      </Tabs>
    </nav>
  );
}
