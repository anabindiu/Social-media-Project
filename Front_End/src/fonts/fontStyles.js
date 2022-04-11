import { createGlobalStyle } from "styled-components";
import Montserrat_Black from "./Montserrat-Black.ttf";
import Montserrat_BlackItalic from "./Montserrat-BlackItalic.ttf";
import Montserrat_Bold from "./Montserrat-Bold.ttf";
import Montserrat_BoldItalic from "./Montserrat-BoldItalic.ttf";
import Montserrat_ExtraBold from "./Montserrat-ExtraBold.ttf";
import Montserrat_ExtraBoldItalic from "./Montserrat-ExtraBoldItalic.ttf";
import Montserrat_ExtraLight from "./Montserrat-ExtraLight.ttf";
import Montserrat_ExtraLightItalic from "./Montserrat-ExtraLightItalic.ttf";
import Montserrat_Italic from "./Montserrat-Italic.ttf";
import Montserrat_Light from "./Montserrat-Light.ttf";
import Montserrat_LightItalic from "./Montserrat-LightItalic.ttf";
import Montserrat_Medium from "./Montserrat-Medium.ttf";
import Montserrat_MediumItalic from "./Montserrat-MediumItalic.ttf";
import Montserrat_Regular from "./Montserrat-Regular.ttf";
import Montserrat_SemiBold from "./Montserrat-SemiBold.ttf";
import Montserrat_SemiBoldItalic from "./Montserrat-SemiBoldItalic.ttf";
import Montserrat_Thin from "./Montserrat-Thin.ttf";
import Montserrat_ThinItalic from "./Montserrat-ThinItalic.ttf";


const FontStyles = createGlobalStyle`
    @font-face {
        font-family: 'Montserrat_BlackItalic';
        src: url(${Montserrat_Black}) format('truetype');
    }
    @font-face {
        font-family: 'Montserrat_BlackItalic';
        src: url(${Montserrat_BlackItalic}) format('truetype');
    }
    @font-face {
        font-family: 'Montserrat_Bold';
        src: url(${Montserrat_Bold}) format('truetype');
    }
    @font-face {
        font-family: 'Montserrat_BoldItalic';
        src: url(${Montserrat_BoldItalic}) format('truetype');
    }
    @font-face {
        font-family: 'Montserrat_ExtraBold';
        src: url(${Montserrat_ExtraBold}) format('truetype');
    }
    @font-face {
        font-family: 'Montserrat_ExtraBoldItalic';
        src: url(${Montserrat_ExtraBoldItalic}) format('truetype');
    }
    @font-face {
        font-family: 'Montserrat_ExtraLight';
        src: url(${Montserrat_ExtraLight}) format('truetype');
    }
    @font-face {
        font-family: 'Montserrat_ExtraLightItalic';
        src: url(${Montserrat_ExtraLightItalic}) format('truetype');
    }
    @font-face {
        font-family: 'Montserrat_Italic';
        src: url(${Montserrat_Italic}) format('truetype');
    }
    @font-face {
        font-family: 'Montserrat_Light';
        src: url(${Montserrat_Light}) format('truetype');
    }
    @font-face {
        font-family: 'Montserrat_LightItalic';
        src: url(${Montserrat_LightItalic}) format('truetype');
    }
    @font-face {
        font-family: 'Montserrat_Medium';
        src: url(${Montserrat_Medium}) format('truetype');
    }
    @font-face {
        font-family: 'Montserrat_MediumItalic';
        src: url(${Montserrat_MediumItalic}) format('truetype');
    }
    @font-face {
        font-family: 'Montserrat_Regular';
        src: url(${Montserrat_Regular}) format('truetype');
    }
    @font-face {
        font-family: 'Montserrat_SemiBold';
        src: url(${Montserrat_SemiBold}) format('truetype');
    }
    @font-face {
        font-family: 'Montserrat_SemiBoldItalic';
        src: url(${Montserrat_SemiBoldItalic}) format('truetype');
    }
    @font-face {
        font-family: 'Montserrat_Thin';
        src: url(${Montserrat_Thin}) format('truetype');
    }
    @font-face {
        font-family: 'Montserrat_ThinItalic';
        src: url(${Montserrat_ThinItalic}) format('truetype');
    }
`;

export default FontStyles;
