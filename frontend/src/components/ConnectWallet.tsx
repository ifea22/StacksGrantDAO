import React from 'react'
import { AppConfig, UserSession, showConnect, authenticate, openSignatureRequestPopup } from '@stacks/connect'
import { StacksTestnet } from '@stacks/network'

const appConfig = new AppConfig(['store_write', 'publish_data'])
const userSession = new UserSession({ appConfig })
const network = new StacksTestnet()

interface ConnectWalletProps {
  onUserChange?: (userData: any) => void
}

export default function ConnectWallet({ onUserChange }: ConnectWalletProps) {
  const [userData, setUserData] = React.useState<any>(null)

  React.useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setUserData(userData)
        onUserChange?.(userData)
      })
    } else if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData()
      setUserData(userData)
      onUserChange?.(userData)
    }
  }, [onUserChange])

  const connectWallet = () => {
    showConnect({
      appDetails: {
        name: 'StacksGrantDAO',
        icon: window.location.origin + '/favicon.ico',
      },
      redirectTo: '/',
      onFinish: () => {
        window.location.reload()
      },
      userSession,
    })
  }

  const disconnectWallet = () => {
    userSession.signUserOut('/')
    setUserData(null)
    onUserChange?.(null)
  }

  if (userData) {
    const address = userData.profile?.stxAddress?.testnet || userData.profile?.stxAddress?.mainnet
    return (
      <div style={{display:'flex', alignItems:'center', gap:8}}>
        <span style={{fontSize:12}}>Connected:</span>
        <code style={{fontSize:12}}>{address?.slice(0,6)}…{address?.slice(-6)}</code>
        <button onClick={disconnectWallet}>Disconnect</button>
      </div>
    )
  }

  return (
    <button onClick={connectWallet}>Connect Wallet</button>
  )
}
