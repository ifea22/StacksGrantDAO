import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { StacksTestnet } from '@stacks/network';
const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });
const network = new StacksTestnet();
export default function ConnectWallet({ onUserChange }) {
    const [userData, setUserData] = React.useState(null);
    React.useEffect(() => {
        if (userSession.isSignInPending()) {
            userSession.handlePendingSignIn().then((userData) => {
                setUserData(userData);
                onUserChange?.(userData);
            });
        }
        else if (userSession.isUserSignedIn()) {
            const userData = userSession.loadUserData();
            setUserData(userData);
            onUserChange?.(userData);
        }
    }, [onUserChange]);
    const connectWallet = () => {
        showConnect({
            appDetails: {
                name: 'StacksGrantDAO',
                icon: window.location.origin + '/favicon.ico',
            },
            redirectTo: '/',
            onFinish: () => {
                window.location.reload();
            },
            userSession,
        });
    };
    const disconnectWallet = () => {
        userSession.signUserOut('/');
        setUserData(null);
        onUserChange?.(null);
    };
    if (userData) {
        const address = userData.profile?.stxAddress?.testnet || userData.profile?.stxAddress?.mainnet;
        return (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 8 }, children: [_jsx("span", { style: { fontSize: 12 }, children: "Connected:" }), _jsxs("code", { style: { fontSize: 12 }, children: [address?.slice(0, 6), "\u2026", address?.slice(-6)] }), _jsx("button", { onClick: disconnectWallet, children: "Disconnect" })] }));
    }
    return (_jsx("button", { onClick: connectWallet, children: "Connect Wallet" }));
}
