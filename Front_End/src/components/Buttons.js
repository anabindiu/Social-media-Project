import React from "react";
import styled from 'styled-components';

export const Button_Themes = {
    blue: {
        color: "white",
        background_color: "rgb(0, 212, 212);",
        hover: {
            color: "rgb(0, 212, 212)",
            background_color: "white"
        }
    },
    gray_transparent: {
        color: "black",
        background_color: "transparent",
        hover: {
            color: "black",
            background_color: "transparent"
        }
    }
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