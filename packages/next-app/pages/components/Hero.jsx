import { Heading, Container, Text, Flex, Link, Code } from "@chakra-ui/react";
import React from "react";
import { useConnect } from "wagmi";

function Hero() {
  const { isConnected } = useConnect();
  return (
    <>
      <Container maxW={"1100px"}  px={"2rem"}>
        <Flex
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          h={"100%"}
          w={"100%"}
          py={"4rem"}
        >
          <Flex justifyContent={"center"} alignItems={"center"}>
            <Heading
              className={"h-shadow-black"}
              fontWeight={"700"}
              fontSize={["1.4rem", "1rem", "2.5rem", "3rem", "4rem"]}
            >
              Welcome to&nbsp;
            </Heading>
            <Link
              className={"h-shadow-blue"}
              color={"#0070f3"}
              isExternal
              href="https://github.com/kimuraakiia/DDiary"
            >
              <Heading
                fontWeight={"700"}
                fontSize={["1.4rem", "1rem", "2.5rem", "3rem", "4rem"]}
              >
                Web3 Diary !
              </Heading>
            </Link>
          </Flex>

          <Text
            textAlign={"center"}
            fontSize={["1rem", "1rem", "1.2rem", "1.4rem", "1.6rem"]}
          >
            Here instead of
            <Code fontSize={"1.5rem"}>web2/handwritten</Code>
            daily
          </Text>
        </Flex>
      </Container>
    </>
  );
}

export default Hero;
