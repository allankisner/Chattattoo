import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import React, { useState } from 'react';
import appConfig from '../config.json';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMyMzU5NSwiZXhwIjoxOTU4ODk5NTk1fQ.7uTFPNV2Zq3CbSRfeJaY1AsjB7HzN_hTK_ZNJW2zr_0'
const SUPABASE_URL = 'https://pisqbsovqpxzgcafmrfz.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default function ChatPage() {
    // lógica 
    const [msg, setMsg] = React.useState('');
    const [listMsg, setListMsg] = React.useState([]);

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select(('*'))
            .then(({ data }) => {
                console.log('Dados da Consulta', data)
                setListMsg(data)
            });
    }, []);

    function handleNewMsg(newMsg) {
        const msg = {
            // id: listMsg.length + 1,
            de: 'allankisner',
            texto: newMsg,
        };

        supabaseClient
            .from('mensagens')
            .insert([
                msg
            ])
            .then(({data})=>{
                console.log('Criando Mensagem: ', data)
                setListMsg([
                    data[0],
                    ...listMsg
                ])
            })

        setListMsg([
            msg,
            ...listMsg
        ]);
        setMsg('');
    }

    // ./lógica 
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/11/colorful-graffiti-wall.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList mesages={listMsg} />
                    {/* {listMsg.map((newMsg) => {
                        return (
                            <li key={newMsg.id}>
                                {newMsg.de} :{newMsg.texto};
                            </li>
                        )
                    })} */}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={msg}
                            onChange={(event) => {
                                console.log(event)
                                const infoMsg = event.target.value;
                                setMsg(infoMsg);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();

                                    handleNewMsg(msg);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}


function MessageList(props) {
    console.log(props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mesages.map((msg) => {
                return (
                    <Text
                        key={msg.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://media.istockphoto.com/vectors/panda-logo-vector-id1005372264?s=612x612`}
                            />
                            <Text tag="strong">
                                {msg.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {msg.texto}
                    </Text>
                );
            })}
        </Box>
    )
}