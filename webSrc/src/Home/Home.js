import React, { useEffect, useState } from 'react'

import { Grid } from '@material-ui/core'
import { HubConnectionBuilder } from '@microsoft/signalr'
import Hint from "./Hint";
import style from "../../style";


import Section1 from './Section1';
import Section2 from './Section2';

const Home = (props) => {

    const [connection, setConnection] = useState(null);
    const [chat, setChat] = useState([]);
    const [clients, setClients] = useState(0);
    const [isConnected, setIsConnected] = useState(null);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('/ChatHub')
            .withAutomaticReconnect()
            .build();
        setConnection(newConnection);
        console.log('con', newConnection);
    }, [])

    useEffect(() => {

        const initConn = async () => {
            try {
                await connection.start();
                // connected
                setIsConnected(true);
                connection.on('ReceiveMessage', message => {
                    setChat(chat => [...chat, message]);
                    console.log('NEW MESSG', message);
                })
                connection.on('NewClientJoined', count => {
                    setClients(count)
                });
            } catch (err) {
                // failed
                setIsConnected(false);
                throw err;
            }
        }

        if (connection) {
            console.log('reached')
            initConn();
        }
    }, [connection])

    return <Grid container spacing={1} style={style.fullWidth}>
        {/**<Hint />*/}
        <Section1 isConnected={isConnected} clients={clients} />
        {isConnected && <Section2 connection={connection} chat={chat} />}
    </Grid>
}

export default Home

