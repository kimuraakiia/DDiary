import {
    Drawer,
    Button,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Heading, Text
} from "@chakra-ui/react";
import React from "react";
import moment from "moment";

function ViewDrawer(props) {

    return (
        <>
            <Drawer onClose={props.onClose} isOpen={props.isOpen} size={'xl'}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <Heading>
                            {props.title}
                        </Heading>
                        <Text   fontSize='sm'>
                            {"edit at "+ moment(parseInt(props.timestamp)).format("YYYY-MM-DD HH:mm:ss")}
                        </Text >
                    </DrawerHeader>
                    <DrawerBody>
                        <p>
                           { props.content}
                        </p>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default ViewDrawer;
