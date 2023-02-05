import ReactPlayer from "react-player";

export type Props = {
  url: string;
  handleEnded: () => void;
};

export default function ({ url, handleEnded }: Props) {
  return (
    <ReactPlayer
      url={url + "&origin=http://localhost:3000"}
      width="100%"
      height="100%"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
      }}
      onEnded={handleEnded}
      controls
      playing
    />
  );
}
