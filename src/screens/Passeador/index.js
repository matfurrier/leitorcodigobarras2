// cSpell:Ignore hearto, servicos, arrowleft, arrowright, usuario
import React, {useState, useEffect} from 'react'
import {useNavigation, useRoute} from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import Swiper from 'react-native-swiper'
import Api from '../../components/Api'
import Stars from '../../components/Stars'
import {Container, Scroller, PageBody, UserInfoArea, UserAvatar, UserInfo,
        UserInfoName, LoadingIcon, FakeSwiper, SwipeDot, SwipeDotActive, SwipeImage, SwipeItem,
        UserFavButton, ServiceArea, ServiceTitle, ServiceItem, ServiceInfo,
        ServiceName, ServicePrice, ServiceChooseButton, ServiceChooseBtnText,
        TestimonialArea, TestimonialBody, TestimonialInfo, TestimonialItem,
        TestimonialName } 
from './styles'
      

export default () => {
    const navigation = useNavigation()
    const route = useRoute()
    const [loading, setLoading] = useState(false)
    const [favorited, setFavorited] = useState(false)

    const [passeadorInfo, setPasseadorInfo] = useState({
        _id: route.params._id,
        avatar: route.params.avatar,
        nome: route.params.nome,
        estrelas: route.params.estrelas
    })

    useEffect(()=> {
        const getPasseadorInfo = async() => {
            setLoading(true)
            let json = await Api.getPasseador(passeadorInfo._id)
            if(json.errors){
                alert(json.errors)
            } else {
                setPasseadorInfo(json)
            }
            setLoading(false)
        }
        getPasseadorInfo()
    },[])

    const handleFavorited = () => {
        setFavorited(!favorited)
    }

    return(
        <Container>
            <Scroller>
                {passeadorInfo.fotos && passeadorInfo.fotos.length > 0
                ? <Swiper
                    style={{height: 240}}
                    dot={<SwipeDot/>}
                    activeDot={<SwipeDotActive />}
                    paginationStyle={{top: 15, right: 15, bottom: null, left: null}}
                    autoplay={true}                
                >
                    {passeadorInfo.fotos.map((item, key)=> (
                        <SwipeItem key={key}>
                            <SwipeImage source ={{uri: item.url}} resizeMode="cover" />
                        </SwipeItem>
                    ))}
                </Swiper>
                : <FakeSwiper/>
                }
                <PageBody>
                    {loading && <LoadingIcon size="large" color="#000" />}
                    <UserInfoArea>
                    <UserAvatar source={{uri: passeadorInfo.avatar}}></UserAvatar>
                        <UserInfo>
                             <UserInfoName>{passeadorInfo.nome}</UserInfoName>
                            <Stars stars={passeadorInfo.estrelas} />
                        </UserInfo>
                        <UserFavButton onPress={handleFavorited}>
                        {favorited
                        ? <AntDesign name="heart" size={25} color="#FF0000" />
                        : <AntDesign name="hearto" size={25} color="#AAA" />   
                        }
                        </UserFavButton>
                    </UserInfoArea>
                    {passeadorInfo.servicos && passeadorInfo.servicos.length > 0 &&
                    <ServiceArea>
                        <ServiceTitle>Lista de Serviços</ServiceTitle>
                        {passeadorInfo.servicos.map((item, key)=> (
                            <ServiceItem key={key}>
                                <ServiceInfo>
                                    <ServiceName>{item.nome}</ServiceName>
                                    <ServicePrice>R$ {item.preco}</ServicePrice>
                                </ServiceInfo>
                                <ServiceChooseButton>
                                    <ServiceChooseBtnText>Agendar</ServiceChooseBtnText>
                                </ServiceChooseButton>
                            </ServiceItem>
                        ))}
                    </ServiceArea>
                    }
                    {passeadorInfo.testemunhos && passeadorInfo.testemunhos.length > 0 &&
                    <TestimonialArea>
                        <Swiper
                            style={{height: 110}}
                            showsPagination={false}
                            showsButtons={true}
                            prevButton={<AntDesign name="arrowleft" size={35} color="#000" />}
                            nextButton={<AntDesign name="arrowright" size={35} color="#000" />}
                            >
                                {passeadorInfo.testemunhos.map((item, key)=> (
                                    <TestimonialItem key={key}>
                                        <TestimonialInfo>
                                            <TestimonialName>{item.usuario}</TestimonialName>
                                            <Stars stars={item.estrelas} />
                                        </TestimonialInfo>
                                        <TestimonialBody>
                                            {item.texto}
                                        </TestimonialBody>
                                    </TestimonialItem>
                                ))}
                            </Swiper>
                    </TestimonialArea>

                    }
                </PageBody>
            </Scroller>
        </Container>
    )
}