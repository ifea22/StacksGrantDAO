import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import Submit from './pages/Submit';
import Proposals from './pages/Proposals';
import Treasury from './pages/Treasury';
import ConnectWallet from './components/ConnectWallet';
export default function App() {
    const [tab, setTab] = React.useState('proposals');
    const [userData, setUserData] = React.useState(null);
    const userAddress = userData?.profile?.stxAddress?.testnet;
    return (_jsxs("div", { style: { fontFamily: 'Inter, system-ui, sans-serif', padding: '24px', maxWidth: 900, margin: '0 auto' }, children: [_jsxs("header", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }, children: [_jsx("h1", { children: "StacksGrantDAO - Testnet" }), _jsx(ConnectWallet, { onUserChange: setUserData })] }), _jsxs("nav", { style: { display: 'flex', gap: 12, marginBottom: 16 }, children: [_jsx("button", { onClick: () => setTab('proposals'), style: {
                            backgroundColor: tab === 'proposals' ? '#007bff' : '#f8f9fa',
                            color: tab === 'proposals' ? 'white' : '#333',
                            border: '1px solid #ddd',
                            padding: '8px 16px',
                            borderRadius: 4,
                            cursor: 'pointer'
                        }, children: "Active Proposals" }), _jsx("button", { onClick: () => setTab('submit'), style: {
                            backgroundColor: tab === 'submit' ? '#007bff' : '#f8f9fa',
                            color: tab === 'submit' ? 'white' : '#333',
                            border: '1px solid #ddd',
                            padding: '8px 16px',
                            borderRadius: 4,
                            cursor: 'pointer'
                        }, children: "Submit Proposal" }), _jsx("button", { onClick: () => setTab('treasury'), style: {
                            backgroundColor: tab === 'treasury' ? '#007bff' : '#f8f9fa',
                            color: tab === 'treasury' ? 'white' : '#333',
                            border: '1px solid #ddd',
                            padding: '8px 16px',
                            borderRadius: 4,
                            cursor: 'pointer'
                        }, children: "Treasury" })] }), tab === 'submit' && _jsx(Submit, { userAddress: userAddress }), tab === 'proposals' && _jsx(Proposals, {}), tab === 'treasury' && _jsx(Treasury, {}), _jsx("footer", { style: { marginTop: 32, opacity: 0.7 }, children: _jsxs("small", { children: ["Update addresses in ", _jsx("code", { children: "src/config.ts" }), " after deploy."] }) })] }));
}
