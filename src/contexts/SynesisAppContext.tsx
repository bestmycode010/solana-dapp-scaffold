import { createContext, FC, ReactNode,  useEffect, } from 'react'
import { useRouter } from 'next/router'
import { useWallet } from '@solana/wallet-adapter-react'
import { useConnection } from '@solana/wallet-adapter-react'
import _ from 'lodash'
import { usePrevious } from 'hooks/usePrevious'

export interface SynesisAppContextState {
}

export const SynesisAppContext = createContext<SynesisAppContextState>({} as SynesisAppContextState)

export interface SynesisAppProviderProps {
  children: ReactNode
}

export const SynesisAppProvider: FC<SynesisAppProviderProps> = ({ children }) => {
  const { connection } = useConnection()
  const router = useRouter()

  const wallet = useWallet()
  const prevWalletPublicKey = usePrevious(wallet.publicKey)

  useEffect(() => {
    if (wallet.publicKey) {
      if (router.pathname === '' || router.pathname === '/') {
        if (prevWalletPublicKey === null) {
          router.push('/first')
        }
      }
    } 
  }, [wallet.publicKey, connection, router.push, router.pathname])
  return (
    <SynesisAppContext.Provider
      value={{
      }}
    >
      {children}
    </SynesisAppContext.Provider>
  )
}
