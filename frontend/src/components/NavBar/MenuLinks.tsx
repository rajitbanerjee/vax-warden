import { HStack } from "@chakra-ui/react";
import React from "react";
import { MenuItem } from "./MenuItem";

// TODO implement link routes, authN handling, etc.
export const MenuLinks: React.FC = (): JSX.Element => {
  return (
    <HStack spacing={8}>
      <MenuItem to="/home">Home</MenuItem>
      <MenuItem to="/statistics">Statistics</MenuItem>
      <MenuItem to="/forum">Forum</MenuItem>
      <MenuItem to="/myaccount">My Account</MenuItem>
      <MenuItem to="/signout">Sign Out</MenuItem>
    </HStack>
  );
};
