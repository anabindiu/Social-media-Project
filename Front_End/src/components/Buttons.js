import React from "react";
import {Link} from "react-router-dom";
import styled from 'styled-components';
import {Button_Themes} from "../components/Themes";

export function LinkButton({page, title}){
    return (
        <Link to={page}>
          <Button>{title}</Button>
        </Link>
    );
}

export const Button = styled.button`
    font-family: "Montserrat_Light";
    display: inline-block;
    display: block;
    font-size: 1.1rem;
    margin: 1em;
    padding: 0.25em 1em;
    border: none;
    border-radius: 10px;
    transition: 0.3s all ease-out;
    color: ${props => Button_Themes[props.theme].color};
    background-color: ${props => Button_Themes[props.theme].background_color};
    &:hover{
        color: ${props => Button_Themes[props.theme].hover.color};
        background-color: ${props => Button_Themes[props.theme].hover.background_color};
    }
`;
Button.defaultProps = {
    theme: "blue"
}