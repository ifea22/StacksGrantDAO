import React from 'react'
import Submit from './pages/Submit'
import Proposals from './pages/Proposals'
import Treasury from './pages/Treasury'
import ConnectWallet from './components/ConnectWallet'

export default function App() {
  const [tab, setTab] = React.useState<'submit'|'proposals'|'treasury'>('proposals')
  const [userData, setUserData] = React.useState<any>(null)
  
  const userAddress = userData?.profile?.stxAddress?.testnet

  return (
    <div style={{fontFamily:'Inter, system-ui, sans-serif', padding: '24px', maxWidth: 900, margin: '0 auto'}}>
      <header style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16}}>
        <h1>StacksGrantDAO - Testnet</h1>
        <ConnectWallet onUserChange={setUserData} />
      </header>

      <nav style={{display:'flex', gap:12, marginBottom:16}}>
        <button 
          onClick={()=>setTab('proposals')}
          style={{
            backgroundColor: tab === 'proposals' ? '#007bff' : '#f8f9fa',
            color: tab === 'proposals' ? 'white' : '#333',
            border: '1px solid #ddd',
            padding: '8px 16px',
            borderRadius: 4,
            cursor: 'pointer'
          }}
        >
          Active Proposals
        </button>
        <button 
          onClick={()=>setTab('submit')}
          style={{
            backgroundColor: tab === 'submit' ? '#007bff' : '#f8f9fa',
            color: tab === 'submit' ? 'white' : '#333',
            border: '1px solid #ddd',
            padding: '8px 16px',
            borderRadius: 4,
            cursor: 'pointer'
          }}
        >
          Submit Proposal
        </button>
        <button 
          onClick={()=>setTab('treasury')}
          style={{
            backgroundColor: tab === 'treasury' ? '#007bff' : '#f8f9fa',
            color: tab === 'treasury' ? 'white' : '#333',
            border: '1px solid #ddd',
            padding: '8px 16px',
            borderRadius: 4,
            cursor: 'pointer'
          }}
        >
          Treasury
        </button>
      </nav>

      {tab==='submit' && <Submit userAddress={userAddress} />}
      {tab==='proposals' && <Proposals/>}
      {tab==='treasury' && <Treasury/>}

      <footer style={{marginTop:32, opacity:0.7}}>
        <small>Update addresses in <code>src/config.ts</code> after deploy.</small>
      </footer>
    </div>
  )
}
