// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;


contract Diary{

    mapping (address => DiaryStruct[]) addressToDiary;


    struct DiaryStruct{
        string  title;
        string  cid ;
        string  fileHash;
    }


    function addDiary(string memory cid,string memory fileHash, string memory title) public {
        DiaryStruct[] storage arr = addressToDiary[msg.sender]; //get the existing list
        DiaryStruct memory tempDiary;
        tempDiary.cid = cid;
        tempDiary.fileHash = fileHash;
        tempDiary.title = title;
        arr.push(tempDiary);
        addressToDiary[msg.sender] = arr;
    }

    function getDiary(address addr) public view returns(DiaryStruct[] memory diarys){
        DiaryStruct[] storage arr = addressToDiary[addr];
        return arr;
    }

}
