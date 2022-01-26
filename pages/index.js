import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router';


function Titulo(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.neutrals['200']};
                font-size: 24px;
                font-weight: 600;
                font-family: ;
                font-family: 'Comforter', cursive;               
            }
            `}</style>
    </>
  );
}

// Componente React
// function HomePage() {
//     // JSX
//     return (
//         <div>
//             <GlobalStyle />
//             <Titulo tag="h2">Boas vindas de volta!</Titulo>
//             <h2>Chattatto</h2>
//         </div>
//     )
// }
// export default HomePage

export default function PaginaInicial() {
  // const username = 'allankisner';
 const [username, setUsername] = React.useState();
 const route = useRouter();
 
  return (
    <>      
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/11/colorful-graffiti-wall.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
            opacity: '0.95',
            
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit = {function(event){
                event.preventDefault();
                console.log('alguém apertou')
                route.push('/chat');
                //window.location.href='/chat';
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Titulo tag="h1">CHATATTOO!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

          { /* <input 
            type="text"
            value={username}
            onChange={function(event){
              console.log('usuario digitou', event.target.value);
              //Localização do valor
              const valor = event.target.value;
              // Troca o valor da váriavel através do react
              setUsername(valor);
            }}
            />
        */}

        

            <TextField
            value={username}
            onChange={function(event){
                console.log('usuario digitou', event.target.value);
                //Localização do valor
                const valor = event.target.value;
                // Troca o valor da váriavel através do react
                setUsername(valor)
            }}
             fullWidth
             TextFieldColors={{
                 neutral: {
                     textColor: appConfig.theme.colors.neutrals[200],
                     mainColor: appConfig.theme.colors.neutrals[200],
                     mainColorHighlight: appConfig.theme.colors.primary[400],
                     backgroundColor: appConfig.theme.colors.neutrals[200],
                 },
             }}
            /> 

            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}