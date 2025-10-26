import React from 'react'
import Submit from './pages/Submit'
import Proposals from './pages/Proposals'
import Treasury from './pages/Treasury'
import ConnectWallet from './components/ConnectWallet'

export default function App() {
  const [tab, setTab] = React.useState<'submit'|'proposals'|'treasury'>('submit')
  return (
    <div style={{fontFamily:'Inter, system-ui, sans-serif', padding: '24px', maxWidth: 900, margin: '0 auto'}}>
      <header style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16}}>
        <h1>DAO Grants (Stacks)</h1>
        <ConnectWallet/>
      </header>

      <nav style={{display:'flex', gap:12, marginBottom:16}}>
        <button onClick={()=>setTab('submit')}>Submit Proposal</button>
        <button onClick={()=>setTab('proposals')}>Active Proposals</button>
        <button onClick={()=>setTab('treasury')}>Treasury</button>
      </nav>

      {tab==='submit' && <Submit/>}
      {tab==='proposals' && <Proposals/>}
      {tab==='treasury' && <Treasury/>}

      <footer style={{marginTop:32, opacity:0.7}}>
        <small>Update addresses in <code>src/config.ts</code> after deploy.</small>
      </footer>
    </div>
  )
}
