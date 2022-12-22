import { styled } from "../stitches";
import Link from "next/link";
import { grassA } from "@radix-ui/colors";

const Header = () => {
  return (
    <HeaderStyled>
      <Link href="/">
        <HeaderTitle>
          <em>Photography of </em>Ron Martin-Adkins
        </HeaderTitle>
      </Link>
    </HeaderStyled>
  );
};

const HeaderTitle = styled("span", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  lineHeight: "1em",
  fontWeight: "800",
  fontSize: "$gr7",
  textDecoration: "none",
  fontFamily: "$ronSerif",
  textShadow: `5px 5px 13px #fff3`,

  em: {
    display: "block",
    fontWeight: "300",
    fontSize: "$gr3",
    fontStyle: "italic",
    color: "$sage11",
  },
});

const HeaderStyled = styled("header", {
  padding: "$gr6 0",
  display: "flex",
  justifyContent: "center",
  background: "linear-gradient(180deg, #fffc 0%, #fff0 100%);",
});

export default Header;
