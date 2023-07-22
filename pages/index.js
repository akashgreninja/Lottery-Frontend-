import Image from 'next/image'

import { useMoralis } from "react-moralis";
// import Headers from '../components/Headers';
import EasyHeader from '../components/EasyHeader';
import LotteryEntrance from '../components/LotteryEntrance';


export default function Home() {
  const { isWeb3Enabled, chainId } = useMoralis();
  return (
   <main>
   <EasyHeader />
    <LotteryEntrance/>
   </main>
  )
}
