import Header from "./Header";
import React, {useEffect} from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import {useAccount, useContractRead, useContractWrite, usePrepareContractWrite} from "wagmi";
import EditDrawer from "./components/EditDrawble";
import {Web3Storage} from 'web3.storage'
import {diaryAddress, greeterAddress} from "../utils/contractAddress";
import contractAbi from "../contracts/ABI/Diary.json";
import {Grid, GridItem, Text} from "@chakra-ui/react";

export default function Home() {
    const {address, isConnected} = useAccount();/**/
    const [isOpen, onOpen] = React.useState(false)
    const storageClient = new Web3Storage({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDVkNDNFZTQ1NzkyZDJiMWY2RGQ0MjQzYzA3YTU5MDEyNjc0YzZFYzAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjI0NjA4MzQ0MTMsIm5hbWUiOiJhIn0.KL20TkTspADvFteE3Z9P5gAcPcqlHQS8cE_PzM36JJ8'})

    const [cid, setCid] = React.useState(" ")
    const [fileHash, setFileHash] = React.useState(" ")
    const [cidTitle, setTitle] = React.useState(" ")


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
        onOpen(true)
    }

    const onClose = function () {
        onOpen(false)
    }

    const sha256 = async (str) => {
        const buf = await crypto.subtle.digest("SHA-256", new TextEncoder("utf-8").encode(str));
        return Array.prototype.map.call(new Uint8Array(buf), x => (('00' + x.toString(16)).slice(-2))).join('');
    }


    const submitDiary = async function (title, content) {
        onClose()

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
    console.log(data)
    return (
        <>
            <Header/>
            <Navbar write={writeBack}/>
            <Hero/>

            {
                isConnected && data && <div style={{marginLeft: "20%", marginRight: "20%"}}>
                    <Grid templateColumns='repeat(5, 1fr)' gap={5}>
                        {data.map((reptile) => (
                            <GridItem w='100%' h='10' bg='blue.500'>
                                <p>{reptile.title}</p>
                            </GridItem>
                        ))}
                    </Grid>
                </div>
            }

            <EditDrawer isOpen={isOpen} onClose={onClose} submitDiary={submitDiary}/>
        </>
    );
}
