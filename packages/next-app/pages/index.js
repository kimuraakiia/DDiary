import Header from "./Header";
import React, {useEffect} from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import {useAccount} from "wagmi";
import Footer from "./components/Footer";
import Greeter from "./components/Greeter";
import {useToast} from "@chakra-ui/react";
import EditDrawer from "./components/EditDrawble";

export default function Home() {
    const {isConnected} = useAccount();/**/
    const toast = useToast();
    const [value, setValue] = React.useState("**Hello world!!!**");
    const [isOpen, onOpen] = React.useState(false)

    const write = function () {
        onOpen(true)
    }

    const onClose = function (){
        onOpen(false)
    }

    return (
        <>
            <Header/>
            <Navbar write={write}/>
            <Hero/>
            <EditDrawer isOpen={isOpen} onClose={onClose}/>
        </>
    );
}
