import React, { useState, useEffect } from 'react'
import { Grid, List, ListItem, ListItemText, Typography, TextField, Button } from '@material-ui/core'

import style from '../../style'
import ChatBox from "./ChatBox"

const USER_ID = Date.now() + "";

const Section2 = (props) => {

    const [newMsg, setNewMsg] = useState("");

    const [NumberOfConnection, setNumberOfConnection] = useState(-1)

    useEffect(() => {
        props.connection.send('GetConnectedCount');
    }, [])

    const emitMessage = () => {
        if (newMsg && newMsg.length > 0) {
            props.connection.send('SendMessage', {
                UserId: USER_ID,
                Message: newMsg
            });
        }
    }

    return <Grid container spacing={3}>
        <Typography variant="h6" color="initial">
            Section 1:
        </Typography>
        <Grid container spacing={2}>
            {
                props.chat.length > 0 && (
                    props.chat.map((item, index) => {
                        return (
                            <Grid container justify={item.userId == USER_ID ? 'flex-end' : 'flex-start'} key={index}>
                                <Grid item md={6} lg={6} xs={12}>
                                    <ChatBox isSelf={item.userId == USER_ID} text={item.message} />
                                </Grid>

                            </Grid>
                        )
                    })
                )
            }
        </Grid>
        <Grid item xs={12}>
            <TextField type="text" onChange={e => setNewMsg(e.target.value)} />
            <Button onClick={emitMessage} color="primary" varient="contained">Send</Button>
        </Grid>

    </Grid>
}


export default Section2
