"use client"
import { Web3Button } from '@web3modal/react'

import {
  useDisconnect,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useAccount,
} from "wagmi";

import { useWeb3ModalTheme } from "@web3modal/react";
import abi from "../abi/abi.json"
import { useEffect, useState } from 'react';

export default function Home() {
  const { theme, setTheme } = useWeb3ModalTheme();
  const { disconnect } = useDisconnect();
  const [walletMounted, setWalletMounted] = useState(false);


  const { address, isConnecting, isDisconnected, isConnected } = useAccount();

  const [userTranscations, setUserTransactions] = useState([]);

  setTheme({ themeColor: "blackWhite" });

  let { data: balance, refetch } = useContractRead({

    address: "0x4c3089cB72572947C4eD822054CC25527d8EB9C6",
    abi: abi,
    functionName: "balanceOf",
    args: [address],
    enabled: isConnected,
    onError(error) {
      console.log('Error in read operation', error, address)
    },
    onSuccess(data) {
      console.log("read success", data)
    },
  });


  useEffect(() => {
    setWalletMounted(true);
  }, []);


  const { config } = usePrepareContractWrite({
    address: "0x4c3089cB72572947C4eD822054CC25527d8EB9C6",
    abi: abi,
    functionName: "safeMint",
    args: [address],
    account: address,
    onError(error) {
      console.log('Error', error)
    },
    onSuccess(data) {
      console.log("write data", data);
    },
  });

  const { data, isLoading, isSuccess, write: mintNFT, } = useContractWrite({
    ...config,
    onSuccess(data) {
      setUserTransactions([...userTranscations, data.hash]);
      console.log(data)
    }
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className='flex flex-col items-center justify-between p-15'>Web3 Modal V2 demo</h1>
        <br />
        {walletMounted && address ? <div>connected to {address}</div> : <></>}
      </div>

      <Web3Button className='flex flex-col items-center justify-between p-15' />

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
          refetch();
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
      {walletMounted && balance && <>NFT Balance : {(balance.toString())}</>}
      <br />
      {walletMounted && isLoading && <div>Check Wallet</div>}
      {walletMounted && isSuccess && (
        <ul>
          {userTranscations.map((item, index) => (
            <li key={index}>transaction hash: {JSON.stringify(item)}</li>
          ))}
        </ul>
      )}


    </main>
  )
}
