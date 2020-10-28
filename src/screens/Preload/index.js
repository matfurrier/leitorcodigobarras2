// cSpell:Ignore usuario
import React, { useEffect } from 'react'
import { Container, Title, LoadingIcon, Logo } from './styles'
import { useNavigation } from '@react-navigation/native'
// Converter SVG em React Component
// https://react-svgr.com/playground/?native=true
import AsyncStorage from '@react-native-community/async-storage'

import Dog from '../../components/icons/Dog'
import Api from '../../components/Api'

export default() => {
const navigation = useNavigation()

const checkToken = async () => {
    const token = await AsyncStorage.getItem('token')
    if(token){
        let res = await Api.checkToken(token)
        if(res.nome){
            const dadosToken = ['token', token]
            const dadosUsuario = ['usuario', JSON.stringify(res)]
            await AsyncStorage.multiSet([dadosToken, dadosUsuario])
            navigation.reset({
                routes: [{name: 'MainTab'}]
            })

        } else{
            navigation.navigate('SignIn') //token existe, mas é inválido!
        }
    } else {
        navigation.navigate('SignIn') //token não existe
    }
}

useEffect(() => {
    checkToken()
},[])

    return (
    <Container>
        <Logo>
          <Dog />
        </Logo>
        <Title>Dog Finder</Title>
        <LoadingIcon size="large" color="#FFF" />   
    </Container>
    )
}

