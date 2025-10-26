import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
// Lightweight mock connector for local UI testing without real wallet.
// Replace with @stacks/connect for production.
export default function ConnectWallet() {
    const [connected, setConnected] = React.useState(false);
    const [addr, setAddr] = React.useState('ST3J2GVMMM2R07ZFBJDWTYEYAR8FZH5WKD1T4G6C3');
    return (_jsx("div", { style: { display: 'flex', alignItems: 'center', gap: 8 }, children: connected ? (_jsxs(_Fragment, { children: [_jsx("span", { style: { fontSize: 12 }, children: "Connected:" }), _jsxs("code", { style: { fontSize: 12 }, children: [addr.slice(0, 6), "\u2026", addr.slice(-6)] }), _jsx("button", { onClick: () => setConnected(false), children: "Disconnect" })] })) : (_jsx("button", { onClick: () => setConnected(true), children: "Connect" })) }));
}
