import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import UserService from '../services/UserService';
import TxHistoryService from '../services/TxHistoryService';
import TransactionDetail from "../components/transactionDetail";
import SendEthModal from "../components/SendEthModal";
import Nav from "../components/Nav";
import Header from "../components/Header";
import "./walletPageStyle.css";
const QRCode = require('qrcode');
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/ee2cbc278b5442dfbd27dedb4806c237"));

function Wallet() {
    // Setting our component's initial state
    const [balance, setBalance] = useState(null);
    const [txs, setTxs] = useState([]);
    const [address, setAddress] = useState();
    const [qrCode, setQrCode] = useState(null);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        getWalletInfo();
        QRCode.toDataURL('0x1C3BC05C4cD2902FFbF20e3b87A2cc9d793Fc42B', function (err, url) {
            setQrCode(url);
        })
    }, [])

    function getWalletInfo() {
        UserService.getUserInfo().then(data => {
            const { message, balance } = data;
            if (!message) {
                setAddress(data.address);
                setBalance(balance.toFixed(7));
                TxHistoryService.getTransactions(data.address).then(data2 => {
                    console.log(data.recievedTx.concat(data.sentTx.concat(data2.result)).sort((a, b) => (a.timeStamp.toString().substring(0, 9)) - (b.timeStamp.toString().substring(0, 9))).reverse())
                    setTxs(data.recievedTx.concat(data.sentTx.concat(data2.result)).sort((a, b) => (a.timeStamp.toString().substring(0, 9)) - (b.timeStamp.toString().substring(0, 9))).reverse());
                })

            }
            else if (message.msgBody === "Unauthorized") {

                //Replace with middleware 
                authContext.setUser({ username: "" });
                authContext.setIsAuthenticated(false);
            }
        });
    }

    return (
        <div>
            <Header />
            <Nav page={"wallet"} />
            <div className="walletPage">
                <div className="walletMain">
                    <div className="walletInfoCard">
                        <div className="substance">
                            <img className="qrCode" src={qrCode} alt="qr code"></img>
                            <div className="addressBalance"> 
                            <h2 >Address: {address}</h2>
                            <h3 className="balance">Balance: {parseFloat(balance)} ETH</h3>
                            </div>
                            
                            <SendEthModal />
                            <div className="walletTxCard panel">
                                {txs.map(tx => {
                                    return <TransactionDetail
                                        amount={parseFloat((tx.value / 1000000000000000000).toFixed(6)) || tx.amount}
                                        address={address}
                                        from={tx.from}
                                        type={tx.type}
                                        to={tx.to}
                                        key={Math.random() * 10000}
                                    />
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Wallet;
