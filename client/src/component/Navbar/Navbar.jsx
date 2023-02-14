import {
  Box,
  Flex,
  Menu,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import React, { useState } from "react";
import { a } from "react-router-dom";
import PopUpRole from "../pop/PopUpBtn";

export default function Navbar() {
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <a href={"/"}>
            <Box>Themis</Box>
          </a>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Menu>
                <Stack
                  flex={{ base: 1, md: 0 }}
                  justify={"flex-end"}
                  direction={"row"}
                  spacing={6}
                >
                  <ColorModeSwitcher justifySelf="flex-end" />                    
                    <PopUpRole />
                </Stack>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
