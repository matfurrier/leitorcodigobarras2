import React from 'react'
import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
background-color: #52B5AC;
flex: 1;
justify-content: center;
align-items: center;
`
export const Title = styled.Text`
font-size: 18px;
color: #FFF;
`
export const Logo = styled.View`
transform: scale(0.4);
`
export const InputArea = styled.View`
padding: 15px;
width: 100%;
`

export const CustomButton = styled.TouchableOpacity`
height: 60px;
background-color: #268596;
border-radius: 30px;
justify-content: center;
align-items: center;
`
export const CustomButtonText = styled.Text`
font-size: 18px;
color: #FFF;
`

export const LoadingIcon = styled.ActivityIndicator`
margin-top: 5px;
`
export const SignMessageButton = styled.TouchableOpacity`
flex-direction: row;
justify-content: center;
margin-top: 10px;
margin-bottom: 20px;
`
export const SignMessageButtonText = styled.Text`
font-size: 16px;
color: #268596;
`
export const SignMessageButtonTextBold = styled.Text`
font-size: 16px;
color: #268596;
font-weight: bold;
margin-left: 5px;
margin-bottom: 50px;
`
export const BackButton = styled.TouchableOpacity`
position: absolute;
left: 15px;
top: 15px;
z-index: 2
`