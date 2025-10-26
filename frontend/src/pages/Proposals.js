import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import ProposalCard from '../components/ProposalCard';
// Demo-only mock list; wire to read-only calls in production
export default function Proposals() {
    const [list] = React.useState([
        { id: 1, recipient: 'ST2ABC...', amount: 1000, memo: 'Docs website', yes: 3, no: 1, endHeight: 12345 },
        { id: 2, recipient: 'ST2DEF...', amount: 2500, memo: 'SDK refactor', yes: 1, no: 2, endHeight: 12390 },
    ]);
    return (_jsxs("div", { children: [_jsx("h2", { children: "Active Proposals" }), list.map(p => (_jsx(ProposalCard, { ...p, onVote: (s) => alert(`vote ${s}`), onFinalize: () => alert('finalize') }, p.id))), _jsxs("p", { style: { opacity: .75 }, children: ["Replace mock data by calling ", _jsx("code", { children: "get-proposal" }), " read-only functions."] })] }));
}
