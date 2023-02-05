import ReactPlayer from "react-player";

type Props = {
  url: string;
};

export default function Player({ url }: Props) {
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
      // config={{ file: { forceAudio: true } }}
    />
  );
}
