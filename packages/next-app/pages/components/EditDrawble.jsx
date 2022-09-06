import {
    Box,
    Button,
    FormLabel,
    Input, InputGroup,
    InputLeftAddon,
    InputRightAddon,
    Select,
    Stack,
    Textarea,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react";
import React from "react";


function EditDrawer(props) {
    const firstField = React.useRef()
    const contentField = React.useRef()
    const [resize, setResize] = React.useState('Vertical')

    const save = function () {
        const title = firstField.current.value
        const content = contentField.current.value

        props.submitDiary(title,content)
    }

    return (
        <>
            <Drawer
                isOpen={props.isOpen}
                placement='right'
                initialFocusRef={firstField}
                size={'lg'}
                onClose={props.onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>
                        Create a new Diary
                    </DrawerHeader>

                    <DrawerBody>
                        <Stack spacing='24px'>
                            <Box>
                                <FormLabel htmlFor='username'>Title</FormLabel>
                                <Input
                                    ref={firstField}
                                    id='username'
                                    placeholder='Please enter user name'
                                />
                            </Box>


                            <Box>
                                <FormLabel htmlFor='desc'>Content</FormLabel>
                                <Textarea id='desc'
                                          size='lg'
                                          resize={resize}
                                          ref={contentField}
                                />
                            </Box>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth='1px'>
                        <Button variant='outline' mr={3} onClick={props.onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue' onClick={()=>{save()}}>Submit</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}
export default EditDrawer;
