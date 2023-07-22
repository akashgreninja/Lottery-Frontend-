import React from 'react'
import { ConnectButton } from 'web3uikit'
const EasyHeader = () => {
  return (
    <>
    Decentralized Lottery
    <ConnectButton moralisAuth={false}/>
    </>
  )
}

export default EasyHeader