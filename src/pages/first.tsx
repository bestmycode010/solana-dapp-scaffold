import type { NextPage } from "next";
import Head from "next/head";
import { FirstView } from "views/first";

const First: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Solana Scaffold</title>
        <meta
          name="description"
          content="Solana Scaffold"
        />
      </Head>
      <FirstView />
    </div>
  );
};

export default First;
