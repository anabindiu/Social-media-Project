import React from "react";
import styled from 'styled-components';
import {Input_Themes} from "../components/Themes";
import {Button} from "../components/Buttons";

export const Input = styled.input`
    font-family: "Montserrat_Light";
    margin-left: 90px;
    width: 600px;
    height: 30px;
    color: ${props => Input_Themes[props.theme].color};
    background-color: ${props => Input_Themes[props.theme].background_color};
    border: none;
    border-radius: 3px;
`;
Input.defaultProps = {
    theme: "blue"
}

export const Base = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: left;
`;

export const Panel = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: left;
`;

export const Setting = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: left;
`;

export const Body = styled.div`
    width: 320px;
    padding: 10px;
    border: 1px solid rgb(247, 240, 240);
    background-color: rgb(255, 255, 255);
    border-radius: 10px 10px 10px 10px;
    width: 600px;
    margin: 10px;
    margin-left: 90px;
`;

export const Description = styled.p`
    font-family: "Montserrat_Light";
`;

export const Header6 = styled.h6`
    font-weight: bold;
    font-size: 1.2rem;
    font-family: "Montserrat_Light";
`;

export const Header3 = styled.h3`
    font-family: "Montserrat_Light";
    font-size: 1.4rem;
    margin-top: 10px;
    margin-left: 90px;
    font-weight: bold;
`;

export const Header1 = styled.h1`
`;

export function PickButton({action, button}){
    if(button.type === "Toggle"){
        return (<Button onClick={action}>{button.title}</Button>);
    }
    else if(button.type === "OneToggle"){
        return (<Button onClick={action}>{button.title}</Button>);
    }
};