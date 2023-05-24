"use client"
import { Web3Button, useWeb3Modal, Web3Modal } from '@web3modal/react'

import {
  useDisconnect,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useAccount
} from "wagmi";
import { useWeb3ModalTheme } from "@web3modal/react";
import abi from "../abi/abi.json"
// import Image from "next/image";
// import { ethers } from "ethers";

export default function Home() {
  // const { address } = useAccount();
  const { theme, setTheme } = useWeb3ModalTheme();
  const { disconnect } = useDisconnect();
  const { address, isConnecting, isDisconnected } = useAccount();

  setTheme({ themeColor: "blackWhite" });

  // Use contract read

  // const { data: readTutorialContract, isError } = useContractRead({
  //   address: "0x4c3089cB72572947C4eD822054CC25527d8EB9C6",
  //   abi: abi,
  //   functionName: "balanceOf",
  //   account: address,
  //   args: [address],
  //   onError(error) {
  //     console.log('Error', error)
  //   },
  // });
  // console.log("read data",readTutorialContract);
  let readvalue;
  const { refetch } = useContractRead({
    address: "0x4c3089cB72572947C4eD822054CC25527d8EB9C6",
    abi: abi,
    functionName: "balanceOf",
    account: address,
    args: [address],
    onError(error) {
      console.log('Error', error)
    },
    onSuccess(data) {
      readvalue = data;
      console.log(readvalue);
    }
  });

  const { config } = usePrepareContractWrite({
    address: "0x4c3089cB72572947C4eD822054CC25527d8EB9C6",
    abi: abi,
    functionName: "safeMint",
    args: [address],
    account: address,
    onError(error) {
      console.log('Error', error)
    },
  });

  const { data, isLoading, isSuccess, write: mintNFT } = useContractWrite(config);

  return (
    <main className="flex min-h-screen items-center justify-between p-24">
      <div>
        <h1>Web3 Modal V2 demo</h1>
        {address ? <div>connected to {address}</div> : <></>}
      </div>
      <div
        style={{
          marginRight: "2em",
          display: "flex",
          paddingRight: "1em",
        }}
      >

        <Web3Button />
      </div>
      <button
        onClick={() => mintNFT?.()}
        style={{
          color: "black",
          borderRadius: 16,
          backgroundColor: "white",
          height: 50,
          width: 100,
        }}
      >
        Mint
      </button>
      <button
        onClick={async () => {
          await refetch();
        }}
        style={{
          color: "black",
          borderRadius: 16,
          backgroundColor: "white",
          height: 50,
          width: 100,
        }}
      >
        NFT balance
      </button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}


    </main>
  )
}
