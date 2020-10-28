import React from 'react'
import styled from 'styled-components/native'
import { AntDesign } from '@expo/vector-icons'
// icons.expo.fyi

const InputArea = styled.View`
    width: 100%;
    height: 60px;
    background-color: #83D6E3;
    flex-direction: row;
    border-radius: 30px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 15px;
`

const Input = styled.TextInput`
    font-size: 16px;
    color: #268596;
    margin-left: 10px;
    flex: 1
`
{/* origamid.com/projetos/flexbox-guia-completo */}


export default ( props ) => {
    return(
    <InputArea>
       <AntDesign name={props.icon} size={40} color="#268596" />
       <Input
         autoCompleteType={props.autoComplete}
         placeholder={props.placeholder}
         value={props.value}
         autoFocus={props.autoFocus || false}
         onChangeText={props.onChangeText}
         secureTextEntry={props.password}
         />
         
    </InputArea>
    )
}