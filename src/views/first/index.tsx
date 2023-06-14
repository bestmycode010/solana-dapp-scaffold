// Next, React
import { FC, useCallback, useEffect } from 'react';
import bs58 from 'bs58';

// Wallet
import { useWallet } from '@solana/wallet-adapter-react';
import { verify } from '@noble/ed25519';
import { notify } from 'utils/notifications';

export const FirstView: FC = ({ }) => {
  const wallet = useWallet();

  const handleTest = useCallback(async () => {
    try {
        // `publicKey` will be null if the wallet isn't connected
        if (!wallet.publicKey) throw new Error('Wallet not connected!');
        // `signMessage` will be undefined if the wallet doesn't support it
        if (!wallet.signMessage) throw new Error('Wallet does not support message signing!');
        // Encode anything as bytes
        const message = new TextEncoder().encode('Hello, world!');
        // Sign the bytes using the wallet
        const signature = await wallet.signMessage(message);
        // Verify that the bytes were signed using the private key that matches the known public key
        if (!verify(signature, message, wallet.publicKey.toBytes())) throw new Error('Invalid signature!');
        notify({ type: 'success', message: 'Sign message successful!', txid: bs58.encode(signature) });
    } catch (error: any) {
        notify({ type: 'error', message: `Sign Message failed!`, description: error?.message });
        console.log('error', `Sign Message failed! ${error?.message}`);
    }
}, [wallet.publicKey, notify, wallet.signMessage]);

    useEffect(() => {
      handleTest()
  }, [handleTest])


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
