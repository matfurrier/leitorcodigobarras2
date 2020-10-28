// cSpell:Ignore usuario
import React, { useState } from 'react'
import { Container, 
         Logo, 
         InputArea, 
         CustomButton, 
         CustomButtonText,
         LoadingIcon,
         SignMessageButton,
         SignMessageButtonText,
         SignMessageButtonTextBold
         } from '../../components/SignStyles'
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native'         

import SignInput from '../../components/SignInput'
import Dog from '../../components/icons/Dog'
import Api from '../../components/Api'

export default() => {
    const navigation = useNavigation()
    const [campoEmail, setCampoEmail] = useState('')
    const [campoSenha, setCampoSenha] = useState('')
    const [carregando, setCarregando] = useState(false)
    
    const handleSignUp = () => {
     //Iremos enviar para o SignUp, sem a possibilidade de voltar.
     navigation.reset({
         routes: [{name: 'SignUp'}]
     })
    }
    
    {/*ricardo.leme@gmail.com secreta */}
    const validaLogin = async() => {
        setCarregando(true)
        if(campoEmail && campoSenha){
           let json = await Api.signIn(campoEmail, campoSenha)
           if (json.token){
               await AsyncStorage.setItem('token', json.token)
               let usuario = await Api.checkToken(json.token)
               await AsyncStorage.setItem('usuario', JSON.stringify(usuario))
               navigation.reset({
                   routes: [{name: 'MainTab'}]
               })
           } else {
               let erro = json.errors ? json.errors[0].msg: ''
               alert(`Não foi possível efetuar o login: ${erro}`)
           }
        } else{
            alert('Preencha todos os campos!')
        }
        setCarregando(false)
    }

    return (
    <Container>
        <Logo>
            <Dog />
        </Logo>
        <InputArea>
            <SignInput
                icon="mail"
                placeholder="Digite o seu e-mail"
                value={campoEmail}
                onChangeText={text => setCampoEmail(text)}
                autoFocus={true}
                autoComplete="email"
            />
            <SignInput
                icon="lock"
                placeholder="Digite a sua senha"
                value={campoSenha}
                onChangeText={text => setCampoSenha(text)}
                password={true}
                autoComplete="password"
            />
            <CustomButton onPress={validaLogin}>
                <CustomButtonText>Login</CustomButtonText>
                {carregando && <LoadingIcon size="small" color="#FFF" />}
            </CustomButton>
         </InputArea>
         <SignMessageButton onPress={handleSignUp}>
         <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
         <SignMessageButtonTextBold>Cadastre-se!</SignMessageButtonTextBold>
         </SignMessageButton>
    </Container>
    )
}

