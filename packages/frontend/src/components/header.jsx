import {
  Link,
  Flex,
  Button,
  Spacer,
  Heading,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";

const siteTitle = "Auction Duuh";
export default function Header() {
  return (
    <Flex
      as="header"
      bg={useColorModeValue("gray.100", "gray.600")}
      p={4}
      alignItems="center"
    >
      <LinkBox>
        <Link href={"/"} passHref>
          <LinkOverlay>
            <Heading fontSize="x-large">{siteTitle}</Heading>
          </LinkOverlay>
        </Link>
      </LinkBox>
      <Spacer />
      <Button fontSize="x-large">My Profile </Button>
    </Flex>
  );
}
