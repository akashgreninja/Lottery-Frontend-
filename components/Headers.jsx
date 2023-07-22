import { useMoralis } from "react-moralis";
import React, { useEffect } from "react";

const Headers = () => {
  const {
    enableWeb3,
    account,
    isWeb3Enabled,
    Moralis,
    deactivateWeb3,
    isWeb3EnableLoading,
  } = useMoralis();
  useEffect(() => {
    if (isWeb3Enabled) return;
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("connected")) {
        enableWeb3();
      }
    }
    // enableWeb3()
  }, []);

  useEffect(() => {
    Moralis.onAccountChanged(async (account) => {
      console.log(`account changed to ${account}`);
      if (account == null) {
        window.localStorage.removeItem("connected");
        deactivateWeb3();
        console.log("account removed");
      }
    });
  }, []);

  const HandleClick = async (e) => {
    console.log(isWeb3EnableLoading);
    window.localStorage.setItem("connected", "injected");
    await enableWeb3();
 
  };

  return (
    <div>
      {account ? (
        <div>
          Connected to {account.slice(0, 6)}...
          {account.slice(account.length - 4)}
        </div>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded disabled:opacity-75"
          onClick={HandleClick}
          disabled={true}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default Headers;
