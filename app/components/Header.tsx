import { ReactNode } from "react";
import { useNavigate } from "@remix-run/react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

// 랑크를 받아 페이지를 바로 이동시킬 수도 있고 구체적인 핸들링 함수를 받을 수도 있다.
type Props = {
  title: string;
  leftIcon: ReactNode;
  rightIcon: ReactNode;
  leftLink?: string;
  rightLink?: string;
  leftOnClick?: () => void;
  rightOnClick?: () => void;
};

export default function ({
  title,
  leftIcon,
  rightIcon,
  leftLink,
  rightLink,
  leftOnClick,
  rightOnClick,
}: Props) {
  const navigate = useNavigate();
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          sx={{ marginRight: 2 }}
          onClick={leftLink ? () => navigate(leftLink) : leftOnClick}
        >
          {leftIcon}
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <IconButton
          color="inherit"
          onClick={rightLink ? () => navigate(rightLink) : rightOnClick}
        >
          {rightIcon}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
