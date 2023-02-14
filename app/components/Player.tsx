import { styled } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";

import ReactPlayer, { Props } from "~/components/ReactPlayer.client";
import ClientOnly from "~/components/ClientOnly";

const PlayerContainer = styled("div")({
  position: "relative",
  paddingTop: "56.25%",
});

const PlayerSkeleton = styled(Skeleton)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
});

// Player 안에 PlayerContainer가 있는건 이상하다
// react-player를 여기서 임포트하지 못하기 때문에 ReactPlayer라는 쓸데없는 중간자를 만들어야 함

export default function ({ url, handleEnded }: Props) {
  return (
    <PlayerContainer>
      <ClientOnly
        fallback={<PlayerSkeleton animation="wave" variant="rectangular" />}
      >
        {() => <ReactPlayer url={url} handleEnded={handleEnded} />}
      </ClientOnly>
    </PlayerContainer>
  );
}
