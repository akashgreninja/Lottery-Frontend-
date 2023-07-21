import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useMoralis } from "react-moralis";
import Headers from '@/components/Headers';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { isWeb3Enabled, chainId } = useMoralis();
  return (
   <main>
    <Headers/>
    checkerssssssssssss
   </main>
  )
}
