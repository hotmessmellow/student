import styles from "../styles/Home.module.css";
import NFTGallery from "../components/nftGallery";
import MainLayout from "../layout/mainLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import {useAccount} from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit";


export default function Home() {
  const router = useRouter();
  const {isConnected} = useAccount();


  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Edunft Student Portal</title>
        <meta name="description" content="Edunft Student Portal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout >
        <div>
          <main className={styles.main}>
            {isConnected ? (
              <NFTGallery />
            ) : (
              <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                  <div className="px-4 py-8 bg-white border-2 border-indigo-500 shadow sm:rounded-lg sm:px-10">
                    <div className="flex flex-col items-center align-middle sm:mx-auto sm:w-full sm:max-w-md">
                      <p>Please connect your wallet to view your NFTs.</p>
                      <div className="py-4">
                        <ConnectButton></ConnectButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </MainLayout>
    </>
  );
}
