import { MenuLinks } from "./MenuLinks";
import { NavBarContainer } from "./NavBarContainer";
import { Logo } from "components";
import colors from "custom/colors";

export const NavBar: React.FC = (props): JSX.Element => {
  return (
    <NavBarContainer {...props}>
      <Logo w="500px" color={[colors.fg, colors.fg, "primary.500", "primary.500"]} />
      <MenuLinks />
    </NavBarContainer>
  );
};
