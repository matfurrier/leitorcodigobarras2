// cSpell:Ignore Ionicons, usuario
import React, { useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native'
import {
    Container, Logo, InputArea, CustomButton, CustomButtonText,
    SignMessageButton, SignMessageButtonText, SignMessageButtonTextBold,
    BackButton
} from '../../components/SignStyles'
import { Ionicons } from '@expo/vector-icons'

import Api from '../../components/Api'
import SignInput from '../../components/SignInput'
import Dog from '../../components/icons/Dog'


export default () => {
    const [campoNome, setCampoNome] = useState('')
    const [campoSenha, setCampoSenha] = useState('')
    const [campoEmail, setCampoEmail] = useState('')
    const navigation = useNavigation()

    const handleSignIn = () => {
        //Iremos enviar para o SignIn, sem a possibilidade de voltar.
        navigation.reset({
            routes: [{ name: 'SignIn' }]
        })
    }

    const handleSignUp = async() => {
        if(campoNome && campoEmail && campoSenha) {
            let json = await Api.signUp(campoNome, campoEmail, campoSenha)
            if(json.token) {
                await AsyncStorage.setItem('token', json.token)
                let usuario = await Api.checkToken(json.token)
                await AsyncStorage.setItem('usuario', JSON.stringify(usuario))
                navigation.reset({
                    routes: [{name: 'MainTab'}]
                })
            }else {
                let erro = json.errors ? json.errors[0].msg : ''
                alert(`Não foi possível cadastrar o usuário: ${erro}`)
            }
        } else {
            alert('Preencha todos os campos!')
        }
    }

    return (
        <Container>
            <Logo>
                <Dog />
            </Logo>
            <InputArea>
                <SignInput
                    icon="user"
                    placeholder="Informe o seu nome completo"
                    value={campoNome}
                    autoComplete="name"
                    autoFocus={true}
                    onChangeText={text => setCampoNome(text)}
                />
                <SignInput
                    icon="mail"
                    placeholder="Digite o seu e-mail"
                    value={campoEmail}
                    autoComplete="email"
                    onChangeText={t => setCampoEmail(t)}
                />
                <SignInput
                    icon="lock"
                    placeholder="Digite a sua senha"
                    value={campoSenha}
                    onChangeText={t => setCampoSenha(t)}
                    autoComplete="password"
                    password={true}
                />
                <CustomButton onPress={handleSignUp}>
                    <CustomButtonText>Cadastrar</CustomButtonText>
                </CustomButton>
            </InputArea>
            <SignMessageButton onPress={handleSignIn}>
                <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Efetue o Login</SignMessageButtonTextBold>
            </SignMessageButton>
            <BackButton onPress={handleSignIn}>
                <Ionicons name="ios-arrow-back" size={44} color="#FFF" />
            </BackButton>
        </Container>
    )
}
