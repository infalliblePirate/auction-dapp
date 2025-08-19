import { Text, Center, Container, Flex } from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
import Header from "./header";

export function Layout(props) {
  return (
    <Flex direction="column" minH="100vh">
      <Header />

      <Container maxW="container.md" flex="1" py={8}>
        {props.children}
      </Container>

      <Center as="footer" bg={useColorModeValue("gray.100", "gray.600")} p={7}>
        <Text fontSize= "x-large">DApp Auction - 2025</Text>
      </Center>
    </Flex>
  );
}
