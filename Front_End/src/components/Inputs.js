import React from "react";
import styled from 'styled-components';
import {Input_Themes} from "../components/Themes";


export const Input = styled.input`
    font-family: "Montserrat_Light";
    padding: 0.5em;
    margin: 0.5em;
    color: ${props => Input_Themes[props.theme].color};
    background-color: ${props => Input_Themes[props.theme].background_color};
    border: none;
    border-radius: 3px;
`;
Input.defaultProps = {
    theme: "blue"
}