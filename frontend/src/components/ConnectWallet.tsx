import React from 'react'

// Lightweight mock connector for local UI testing without real wallet.
// Replace with @stacks/connect for production.
export default function ConnectWallet() {
  const [connected, setConnected] = React.useState(false)
  const [addr, setAddr] = React.useState('ST3J2GVMMM2R07ZFBJDWTYEYAR8FZH5WKD1T4G6C3')
  return (
    <div style={{display:'flex', alignItems:'center', gap:8}}>
      {connected ? (
        <>
          <span style={{fontSize:12}}>Connected:</span>
          <code style={{fontSize:12}}>{addr.slice(0,6)}…{addr.slice(-6)}</code>
          <button onClick={()=>setConnected(false)}>Disconnect</button>
        </>
      ) : (
        <button onClick={()=>setConnected(true)}>Connect</button>
      )}
    </div>
  )
}
