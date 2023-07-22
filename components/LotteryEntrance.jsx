import React, { useEffect, useState } from "react";
import { useWeb3Contract } from "react-moralis";
import { Abi, ContractAddresses } from "../constants/index";
import { useMoralis, isWeb3Enabled } from "react-moralis";
import {ethers} from "ethers"
const LotteryEntrance = () => {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis()
  // console.log(parseInt(chainIdHex))
  const chainId = parseInt(chainIdHex);
  const raffleAddress =
    chainId in ContractAddresses ? ContractAddresses[chainId][0] : null;

  const [entrancefee, setentrancefee] = useState("0");

  // const {runContractFunction:enterRaffle} = useWeb3Contract({
  //     abi: Abi,
  //     contractAddress: raffleAddress,
  //     functionName: "enterRaffle",
  //     params: {

  //     },
  //     msgValue:

  // })
  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: Abi,
    contractAddress: raffleAddress,
    functionName: "getEntranceFee",
    params: {},
  });

  useEffect(() => {
   if (isWeb3Enabled){
   
    async function updateUI() {
        const entranceFeeFromCall = await getEntranceFee()
        const maxh=entranceFeeFromCall.toString()
        setentrancefee(ethers.utils.formatUnits(maxh, "ether"))
        console.log(entrancefee);
        console.log("we here");
      }
      updateUI();
   }else{   
    console.log(isWeb3Enabled);
   }
  

  }, [isWeb3Enabled]);

  return <div>LotteryEntrance <div>{entrancefee}</div></div>;
};

export default LotteryEntrance;
