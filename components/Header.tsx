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
  textShadow: `8px 8px 21px ${grassA.grassA11}`,

  em: {
    display: "block",
    fontWeight: "300",
    fontSize: "$gr4",
    fontStyle: "italic",
  },
});

const HeaderStyled = styled("header", {
  padding: "$gr4 0",
  display: "flex",
  justifyContent: "center",
});

export default Header;
