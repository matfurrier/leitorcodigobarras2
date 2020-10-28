//cSpell:Ignore usuario
import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'
import { AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage'

const TabArea = styled.View`
height: 60px;
background-color: #4EADBE;
flex-direction: row;
`

const TabItem = styled.TouchableOpacity`
flex: 1;
justify-content: center;
align-items: center;
`
const TabItemCenter = styled.TouchableOpacity`
width: 70px;
height: 70px;
justify-content: center;
align-items: center;
margin-top: -25px;
background-color: #FFF;
border-radius: 35px;
border: 3px solid #4EADBE;
`


export default ({state, navigation}) => {
    const [usuario, setUsuario] = useState([])

    const verificaUsuario = async() => {
        let dados = await AsyncStorage.getItem('usuario')
        setUsuario(JSON.parse(dados))
    }
    
    //Verifica na primeira vez os dados do usuário
    useEffect(()=> {
        verificaUsuario()
    },[])

    const navigateTo = (screenName) => {
        navigation.navigate(screenName)
    }
    
    return(
        <TabArea>
            <TabItem onPress={() => navigateTo('Home') }>
                <AntDesign style={{opacity: state.index === 0 ? 1 : 0.5}} name="home" size={24} color="#FFF"/>
            </TabItem>
            <TabItem onPress={() => navigateTo('Search') }>
                <AntDesign style={{opacity: state.index === 1 ? 1 : 0.5}} name="search1" size={24} color="#FFF"/>
            </TabItem>
            <TabItemCenter onPress={() => navigateTo('Appointments') }>
                <AntDesign style={{opacity: state.index === 2 ? 1 : 0.5}} name="calendar" size={32} color="#4EADBE"/>
            </TabItemCenter>
            <TabItem onPress={() => navigateTo('Favorites') }>
                <AntDesign style={{opacity: state.index === 3 ? 1 : 0.5}} name="heart" size={24} color="#FFF"/>
            </TabItem>
            <TabItem onPress={() => navigateTo('Profile') }>
                <AntDesign style={{opacity: state.index === 4 ? 1 : 0.5}} name="user" size={24} color="#FFF"/>
            </TabItem>
        </TabArea>
    )
}