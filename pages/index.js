import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useMoralis } from "react-moralis";
// import Headers from '@/components/Headers';
import EasyHeader from '@/components/EasyHeader';
import LotteryEntrance from '@/components/LotteryEntrance';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { isWeb3Enabled, chainId } = useMoralis();
  return (
   <main>
   <EasyHeader />
    <LotteryEntrance/>
   </main>
  )
}
