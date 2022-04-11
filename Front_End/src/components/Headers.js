import styled from 'styled-components';

export const Header_Themes = {
    black: {
        color: "black",
        background_color: "transparent",
    }
}

export const Header2 = styled.h2`
    font-size: 1.5em;
    text-align: center;
    color: ${props => Header_Themes[props.theme].color};
    background-color: ${props => Header_Themes[props.theme].background_color};
`;
Header2.defaultProps = {
    theme: "black"
}