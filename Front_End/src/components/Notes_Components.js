import React from "react";
import styled from 'styled-components';

export const Note_NoneActive = styled.div`
    width: 70%;
    height: 100vh;
    line-height: 100vh;
    text-align: center;
    font-size: 2rem;
    color: rgb(83, 78, 78);
`;

export const Note_Base = styled.div`
    width: 70%;
    height: 50vh;
    padding: 25px;
`;

export const Note_Input = styled.input`
    display: block;
    border: 1px solid #ddd;
    margin-bottom: 20px;
    width: 100%;
    height: 50px;
    padding: 10px;
    resize: none;
    font-size: inherit;
    font-family: inherit;
    border-radius: 20px 20px 20px 20px;
    font-size: 2rem;
`;

export const Note_TextArea = styled.textarea`
    display: block;
    border: 1px solid #ddd;
    margin-bottom: 20px;
    width: 100%;
    height: calc(50vh - 130px);
    padding: 10px;
    resize: none;
    font-size: inherit;
    font-family: inherit;
    border-radius: 20px 20px 20px 20px;
`;