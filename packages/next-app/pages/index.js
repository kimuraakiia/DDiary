import Header from "./Header";
import React, {useEffect} from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import {useAccount, useContractRead, useContractWrite, usePrepareContractWrite} from "wagmi";
import EditDrawer from "./components/EditDrawble";
import {Web3Storage} from 'web3.storage'
import {diaryAddress, greeterAddress} from "../utils/contractAddress";
import contractAbi from "../contracts/ABI/Diary.json";
import {Box, Grid, GridItem, Heading, LinkBox, LinkOverlay, Text, useDisclosure} from "@chakra-ui/react";
import ViewDrawer from "./components/ViewDrawer";

export default function Home() {
    const {address, isConnected} = useAccount();/**/
    const [isEditOpen, setOpen] = React.useState(false)
    const storageClient = new Web3Storage({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDVkNDNFZTQ1NzkyZDJiMWY2RGQ0MjQzYzA3YTU5MDEyNjc0YzZFYzAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjI0NjA4MzQ0MTMsIm5hbWUiOiJhIn0.KL20TkTspADvFteE3Z9P5gAcPcqlHQS8cE_PzM36JJ8'})

    const [cid, setCid] = React.useState(" ")
    const [fileHash, setFileHash] = React.useState(" ")
    const [cidTitle, setTitle] = React.useState(" ")

    const [viewTitle, setViewTitle] = React.useState(" ")
    const [viewContent, setViewContent] = React.useState(" ")
    const [viewTime, setViewTime] = React.useState(" ")


    const { isOpen, onOpen, onClose } = useDisclosure()

    const {data, isError, isLoading} = useContractRead({
        addressOrName: diaryAddress,
        contractInterface: contractAbi,
        functionName: 'getDiary',
        args: address,
    })

    const {
        write,
    } = useContractWrite({
        addressOrName: diaryAddress,
        contractInterface: contractAbi,
        functionName: "addDiary",
        args: [cid, fileHash, cidTitle]
    });

    const writeBack = function () {
        setOpen(true)
    }

    const onEditDrawerClose = function () {
        setOpen(false)
    }

    const sha256 = async (str) => {
        const buf = await crypto.subtle.digest("SHA-256", new TextEncoder("utf-8").encode(str));
        return Array.prototype.map.call(new Uint8Array(buf), x => (('00' + x.toString(16)).slice(-2))).join('');
    }


    const submitDiary = async function (title, content) {
        onEditDrawerClose()

        const formattedContent = {
            isFile: false,
            title: title,
            content: content,
            timestamp: new Date().getTime(),
        }
        const finalizedFileContent = JSON.stringify(formattedContent)
        const fileHash = await sha256(finalizedFileContent)
        const file = new File([finalizedFileContent], fileHash, {type: 'text/plain'});
        const cid = await storageClient.put([file]);
        console.log(cid)
        setCid(cid)
        setFileHash(fileHash)
        setTitle(title)

        await write({
            overrides: {
                gasLimit: "1000000",
            },
        })
    }

    const viewDetails = async function (v) {
        console.log(v)

        const url = "https://dweb.link/ipfs/"+v.cid+"/"+v.fileHash
        const res = await fetch(url)
        const resJson = await res.json();
        console.log(resJson)
        setViewTitle(resJson['title'])
        setViewContent(resJson['content'])
        setViewTime(resJson['timestamp'])
        onOpen()
    }

    return (
        <>
            <Header/>
            <Navbar write={writeBack}/>
            <Hero/>

            {
                isConnected && data && <div style={{marginLeft: "20%", marginRight: "20%",marginBottom:"128px"}}>
                    <Grid templateColumns='repeat(5, 1fr)' gap={5}>
                        {data.map((reptile) => (
                            <GridItem w='100%' key={reptile.cid} >
                                <LinkBox onClick={()=>{viewDetails(reptile)}} as='article' maxW='sm' p='5' borderWidth='1px' rounded='md'>
                                    <Heading size='md' my='2'>
                                        <LinkOverlay href='#'>
                                            <Heading>
                                                {reptile.title}
                                            </Heading>
                                        </LinkOverlay>
                                    </Heading>
                                    <Text>
                                        {reptile.cid}
                                    </Text>
                                </LinkBox>
                            </GridItem>
                        ))}
                    </Grid>
                </div>
            }

            <EditDrawer isOpen={isEditOpen} onClose={onEditDrawerClose} submitDiary={submitDiary}/>

            <ViewDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen} title = {viewTitle} content={viewContent} timestamp={viewTime}/>
        </>
    );
}
