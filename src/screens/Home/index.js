import React, {useState, useEffect} from 'react'
import { RefreshControl } from 'react-native'
import { Container, Scroller, HeaderArea, HeaderTitle, 
         PasseadorArea, SearchButton } from './styles'
import Api from '../../components/Api'
import {AntDesign} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import PasseadorItem from '../../components/PasseadorItem'

export default () => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [listPasseadores, setListPasseadores] = useState([])
    //carregando os dados na primeira vez
    useEffect(() => {
        getPasseadores()
    },[])

    const getPasseadores = async() => {
        setLoading(true)
        setListPasseadores([])
        let res = await Api.getPasseadores()
        setListPasseadores(res)
        setLoading(false)
    }

    const onRefresh = () => {
        getPasseadores()
        setRefreshing(false)
    }

    return(
    <Container>
        <Scroller refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
            <HeaderArea>
                <HeaderTitle>
                    Encontre um profissional para o seu pet
                </HeaderTitle>
                <SearchButton onPress={() => navigation.navigate('Search')}>
                   <AntDesign name="search1" size={26} color="#FFF" />
                </SearchButton>                
            </HeaderArea>
            <PasseadorArea>
                {listPasseadores.map((item, key) => (
                    <PasseadorItem key={key} data={item} />
                ))}

            </PasseadorArea>
        </Scroller>
    </Container>
    )
}