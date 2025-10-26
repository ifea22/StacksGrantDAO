import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
export default function Submit() {
    const [recipient, setRecipient] = React.useState('ST3J2GVMMM2R07ZFBJDWTYEYAR8FZH5WKD1T4G6C3');
    const [amount, setAmount] = React.useState(1000);
    const [memo, setMemo] = React.useState('Grant for hackathon demo');
    return (_jsxs("div", { children: [_jsx("h2", { children: "Submit Proposal" }), _jsxs("div", { style: { display: 'grid', gap: 8, maxWidth: 600 }, children: [_jsxs("label", { children: ["Recipient principal", _jsx("input", { value: recipient, onChange: e => setRecipient(e.target.value), style: { width: '100%' } })] }), _jsxs("label", { children: ["Amount (uint)", _jsx("input", { type: "number", value: amount, onChange: e => setAmount(parseInt(e.target.value || '0')) })] }), _jsxs("label", { children: ["Memo", _jsx("input", { value: memo, onChange: e => setMemo(e.target.value), style: { width: '100%' } })] }), _jsx("button", { onClick: () => alert('Construct and broadcast tx with your wallet. See src/api/stacks.ts for helpers.'), children: "Create Proposal" })] }), _jsx("p", { style: { marginTop: 8, opacity: .75 }, children: "Note: this demo uses a lightweight mock wallet for UI. Replace with @stacks/connect for real transactions." })] }));
}
