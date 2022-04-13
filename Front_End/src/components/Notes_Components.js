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

export const Notes_Base = styled.div`
    display: flex;
`;

export const Note_Base = styled.div`
    width: 70%;
    height: 50vh;
    padding: 25px;
`;

export const Notes_SideBar_Base = styled.div`
    width: 30%;
    height: 100vh;
    border-right: 1px solid #ddd;
`;

export const Notes_SideBar_Header_Base = styled.div`
    display: flex;
    justify-content: space-between;
    height: 14vh;
    padding: 25px;
    background: linear-gradient(
        90deg,
        rgb(46, 150, 219) 0%,
        rgb(221, 228, 255) 100%
    );
`;

export const Notes_SideBar_Header = styled.h1`
    margin: 0;
`;

export const Notes_SideBar_Header_Button = styled.button`
`;

export const Notes_SideBar_Notes_List = styled.div`
    height: calc(100vh - 78px);
    overflow-y: scroll;
`;

export const Notes_SideBar_Note = styled.div`
    margin-top: 30px;
    padding: 25px;
    cursor: pointer;
    &:hover{
        background: #ddd;
        border-radius: 20px 20px 20px 20px;
    };
    &.active{
        background: linear-gradient(
            90deg,
            rgb(142, 65, 187) 0%,
            rgb(93, 119, 235) 100%
        );
        color: rgb(255, 255, 255);
        border-radius: 20px 20px 20px 20px;
    };
`;

export const Notes_SideBar_Note_Header = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Notes_SideBar_Note_Title = styled.strong`
`;

export const Notes_SideBar_Note_Delete = styled.button`
    color: rgb(143, 16, 41);
`;

export const Notes_SideBar_Note_Content = styled.p`
    margin: 10px 0;
`;

export const Notes_SideBar_Note_Modified = styled.small`
    display: block;
    &.active{
        background: linear-gradient(
            90deg,
            rgb(142, 65, 187) 0%,
            rgb(93, 119, 235) 100%
        );
        color: rgb(0, 0, 0);
        border-radius: 20px 20px 20px 20px;
    };
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