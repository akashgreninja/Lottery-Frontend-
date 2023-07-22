import React, { useEffect, useState } from "react";
import { useWeb3Contract } from "react-moralis";
import { Abi, ContractAddresses } from "../constants/index";
import { useMoralis, isWeb3Enabled } from "react-moralis";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";
const LotteryEntrance = () => {
  const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis();
  // console.log(parseInt(chainIdHex))
  const chainId = parseInt(chainIdHex);
  const raffleAddress =
    chainId in ContractAddresses ? ContractAddresses[chainId][0] : null;

  const [entrancefee, setentrancefee] = useState("0");
  const [numberOfPlayers, setNumberOfPlayers] = useState("0");
  const [recentWinner, setRecentWinner] = useState("0");
  const dispatch = useNotification();

  const handleSuccess = async (tx) => {
    await tx.wait(1);

    handleNewNotification(tx);
    updateUIValues()
  };
  const handleNewNotification = (tx) => {
    dispatch({
      type: "info",
      message: "Transaction complete",
      title: "Tx notificaion",
      position: "topR",
      icon: "bell",
    });
  };

  const HandleClick = async () => {
    await enterRaffle({
      onSuccess: handleSuccess,
      onError: (error) => console.log(error),
    });
  };
  const handleWinner = async () => {
    const recentWinnerFromCall = await getRecentWinner();
  
    setRecentWinner(recentWinnerFromCall);
    console.log(recentWinnerFromCall)
    setNumberOfPlayers("0");
  }

  const { runContractFunction: enterRaffle } = useWeb3Contract({
    abi: Abi,
    contractAddress: raffleAddress,
    functionName: "enterRaffle",
    params: {},
    msgValue: entrancefee,
  });
  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: Abi,
    contractAddress: raffleAddress,
    functionName: "getEntranceFee",
    params: {},
  });
  const { runContractFunction: getPlayersNumber } = useWeb3Contract({
    abi: Abi,
    contractAddress: raffleAddress,
    functionName: "getNumberOfPlayers",
    params: {},
  });

  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: Abi,
    contractAddress: raffleAddress,
    functionName: "getRecentWinner",
    params: {},
  });

  async function updateUIValues() {
    const entranceFeeFromCall = await getEntranceFee();
    const maxh = entranceFeeFromCall.toString();
    setentrancefee(maxh);
    console.log(entrancefee);
    console.log("we here");
    const numPlayersFromCall = (await getPlayersNumber()).toString();
    const recentWinnerFromCall = await getRecentWinner();
    setNumberOfPlayers(numPlayersFromCall);
    setRecentWinner(recentWinnerFromCall);
  }
  useEffect(() => {
    if (isWeb3Enabled) {
      updateUIValues();
    } else {
      console.log(isWeb3Enabled);
    }
  }, [isWeb3Enabled]);

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded disabled:opacity-75"
        onClick={HandleClick}
        // disabled={true}
      >
        Enter RAffle
      </button>

      {raffleAddress ? (
        <div>
          Entrance Fee:{ethers.utils.formatUnits(entrancefee, "ether")} ETH
          <br />
          Number of Players:{numberOfPlayers}
          recent winner :{recentWinner}
          {/* {localStorage.getItem("hola")?<button onClick={handleWinner}>whose the winner woooo</button> : null} */}
        </div>
      ) : (
        <div>No raffle address detected </div>
      )}
    </div>
  );
};

export default LotteryEntrance;
