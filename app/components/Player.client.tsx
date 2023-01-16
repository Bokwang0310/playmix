import ReactPlayer from "react-player";

type Props = {
  url: string;
};

export default function Player({ url }: Props) {
  return <ReactPlayer url={url} />;
}
