import React from "react";
import styled from 'styled-components';

export const Task_List_Base = styled.div`
    border-radius: 30px 30px 30px 30px;
    display: flex;
    flex-direction:column;
    justify-content: start;
    width: 700px;
    min-height: 700px;
    background: linear-gradient(
      90deg,
      rgb(27, 14, 49) 0%,
      rgb(36, 29, 97) 100%
    );
    text-align: center;
    margin: 128px auto;
    
    padding-bottom: 60px;
`;

export const Task_List_Header = styled.h1`
`;

export const Task_Form = styled.form`
    margin-bottom: 32px;
    display:flex;
    flex-direction:column;
    align-items:center;
`;

export const Task_Form_Input = styled.input`
    padding: 10px 32px 10px 10px;
    border-radius: 30px 30px 30px 30px;
    border: 2px solid #7f63b8;
    outline: none;
    width: 400px;
    background: transparent;
    color: #fff;
    &:disabled{
        opacity: 0.6;
    };
`;

export const Task_Form_Button = styled.button`
    padding: 5px;
    border: none;
    border-radius: 30px 30px 30px 30px;
    cursor: pointer;
    outline: none;
    width: 400px;
    background: linear-gradient(
      90deg,
      rgb(199, 196, 204) 0%,
      rgb(102, 78, 117) 100%
    );
    color: #fff;
    text-transform: capitalize;
    &:disabled{
        opacity: 0.6;
    };
`;

export const Task_Base = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 4px auto;
    color: #fff;
    background: linear-gradient(
      90deg,
      rgb(175, 161, 164) 0%,
      rgb(165, 73, 118) 100%
    );
  
    padding: 14px;
    border-radius: 30px 30px 30px 30px;
    width: 60%;

    text-decoration: ${props => props.primary ? "line-through" : "none"};
    opacity: ${props => props.primary ? 0.7 : 1.0};

    &:nth-child(4n + 1) {
        background: linear-gradient(
            90deg,
            rgb(162, 162, 170) 0%,
            rgba(155, 0, 250, 1) 100%
        );
    }
  
    &:nth-child(4n + 2) {
        background: linear-gradient(
            90deg,
            rgb(155, 127, 153) 0%,
            rgba(250, 0, 135, 1) 100%
        );
    }
  
    &:nth-child(4n + 3) {
        background: linear-gradient(
            90deg,
            rgb(142, 136, 156) 0%,
            rgb(147, 79, 173) 100%
        );
    }
`;

export const Task_Title = styled.div`
    cursor: pointer;
`;

export const Task_Icons = styled.div`
    display: flex;
    align-items: center;
    font-size: 24px;
    cursor: pointer;
`;