// Next, React
import { FC } from 'react';

// Wallet
import { useWallet } from '@solana/wallet-adapter-react';

export const FirstView: FC = ({ }) => {
  const wallet = useWallet();

  return (

    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <div className='mt-6'>
        <h1 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-fuchsia-500 mb-4">
          First View Page
        </h1>
        </div>
        <div className='mt-6'>
        <h1 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-fuchsia-500 mb-4">
          {
            wallet && wallet.publicKey ? wallet.publicKey.toBase58() : 'Null wallet'
          }
        </h1>
        </div>
      </div>
    </div>
  );
};
