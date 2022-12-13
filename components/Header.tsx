import { styled } from "@stitches/react";
import Link from "next/link";

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
  lineHeight: "1.382em",
  fontWeight: "800",
  fontSize: "1.618rem",

  em: { display: "block", fontWeight: "300", fontSize: "1rem" },
});

const HeaderStyled = styled("header", {
  padding: "2.618rem 1rem",
  display: "flex",
  justifyContent: "center",
});

export default Header;
