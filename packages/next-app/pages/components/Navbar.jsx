import React from "react";
import {Button, Flex} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {useAccount} from "wagmi";

function Navbar(props) {
    const { isConnected } = useAccount();

    return (
    <>
      <Flex px={"4em"} py={"1.5em"} justifyContent={"flex-end"}>
        <ConnectButton />
          {isConnected && <Button mx={'2em'} colorScheme='blue' onClick={props.write}>Write</Button>}
      </Flex>
    </>
  );
}

export default Navbar;
