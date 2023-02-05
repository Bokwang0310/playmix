import { useState } from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

type Props = {
  links: string[];
};

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

export default function Chips({ links }: Props) {
  const [value, setValue] = useState(0);

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
        onChange={(_, value) => setValue(value)}
        TabIndicatorProps={{ hidden: true }}
      >
        {links.map((_, index) => (
          <ChipTab key={index} label="Hello" />
        ))}
      </Tabs>
    </nav>
  );
}
