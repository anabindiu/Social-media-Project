import React, { useEffect, useState } from 'react'
import ReactDOM from "react-dom";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import * as comp from "../components/Settings_Components";
import {Button, LinkButton} from '../components/Buttons';
import auth from '../auth/auth';
import {trackPromise, usePromiseTracker} from "react-promise-tracker";
import { Get_Settings } from '../auth/action/API_requests';

export default function Settings() {
  const create_options = (settings) =>{
    if(settings == undefined ){
      settings = {}
    }
    return([
      {
        header: {
          name: "Notifications",
        },
    
        values: [
          {
          name: "Turn on/off notifications",
          description: `${settings.Notification}`,
          buttons:[
            {
              title: "On",
              type: "Toggle"
            },
            {
              title: "Off",
              type: "Toggle"
            }
          ],
          tags: [],
          },
        ],
      },
      {
        header: {
          name: "Country",
        },
        values: [
          {
            name: "-->List of countries to pick from <--",
            description: `${settings.Country}`,
            buttons:[
              {
                title: "Canada",
                type: "OneToggle"
              },
              {
                title: "USA",
                type: "OneToggle"
              },
              {
                title: "Romania",
                type: "OneToggle"
              },
              {
                title: "Kenya",
                type: "OneToggle"
              }
            ],
            tags: []
          },
        ],
      },
      {
        header: {
          name: "Time",
        },
    
        values: [
          {
            name: "Date Format",
            description: `${settings.Date_Format}`,
            buttons:[
              {
                title: "DD/MM/YY",
                type: "OneToggle"
              },
              {
                title: "MM/DD/YY",
                type: "OneToggle"
              }
            ],
            tags: ["date_format"],
          },
          {
            name: "Time Format",
            description: `${settings.Time_Format}`,
            buttons:[
              {
                title: "1:00pm",
                type: "OneToggle"
              },
              {
                title: "13:00",
                type: "OneToggle"
              }
            ],
            tags: [],
          },
          {
            name: "Time Zone",
            description: `${settings.TimeZone}`,
            buttons:[
              {
                title: "ET",
                type: "OneToggle"
              },
              {
                title: "MT",
                type: "OneToggle"
              }
            ],
            tags:[],
          },
        ],
      },
      {
        header: {
          name: "Theme",
        },
    
        values: [
          {
            name: "Change the theme colour: ",
            description: `${settings.Theme}`,
            buttons:[
              {
                title: "Light",
                type: "OneToggle"
              },
              {
                title: "Dark",
                type: "OneToggle"
              }
            ],
            tags:[],
          },
        ]
      },
      {
        header: {
          name: "Language",
        },
        values: [
          {
            name: "Pick the language: ",
            description: `${settings.Language}`,
            buttons:[
              {
                title: "English",
                type: "OneToggle"
              },
              {
                title: "French",
                type: "OneToggle"
              }
            ],
            tags: [],
          },
        ]
      },
      {
        header: {
          name: "Report problem",
        },
        values: [
          {
          name: "Log",
          description: "",
          buttons:[],
          tags:[],
          }
        ],
      },
    ]);
  }
  const [options, setOptions] = useState(create_options(null));
  const [visibleOptions, setVisibleOptions] = useState(options);

  useEffect(() => {
    trackPromise(
      Get_Settings().then((settings) => {
        setOptions([...create_options(settings)]);
        setVisibleOptions([...create_options(settings)]);
      })
    );
  }, []);
  
const navigate = useNavigate();
const handleLogOut = () =>{
  auth.logout(() => {
    localStorage.clear();
    navigate("/welcome");
    console.log("Logged out");
  })
}

function onChange(e){
  e.preventDefault();
  const value=e.target.value;

  if(value.trim().length === 0) {
    setVisibleOptions(options);
    return;
  }

  const returnedItems= [];
  visibleOptions.forEach((option, index) => {
    const foundOptions=option.values.filter((item)=>{
      return item.name.toLocaleLowerCase().search(value.trim().toLowerCase()) !==-1 || item.name.toLocaleLowerCase().search(value.trim().toLowerCase()) !==-1;
    });

    returnedItems[index]={
      header:{
        name:option.header.name,
      },
      values: foundOptions,
    };

    if(option.header.name.toLocaleLowerCase().search(value.trim().toLowerCase()) !==-1 ){ 
      returnedItems[index]={
        header:{
          name:option.header.name,
        },
        values: options[index].values,
      };
    }
  });

  setVisibleOptions(returnedItems);
};

const DisplaySettings = () => {
  console.log(options);
  return(
    visibleOptions.map((option) =>(
      <comp.Setting>
        <comp.Header3>{option.header.name}</comp.Header3>
        <comp.Body>
        {option.values.map((value) => (
            <div key={value.name}>
                <comp.Header6>{value.name}</comp.Header6>
                <comp.Description>{value.description}</comp.Description>
                {value.buttons.map((button) => (
                  <div key={button.title}>
                    <comp.PickButton type={button.type} title={button.title}/>
                  </div>
                ))}
            </div>
          ))}
        </comp.Body>
      </comp.Setting>
      ))
  );
}

const {promiseInProgress} = usePromiseTracker();

  return (
    <comp.Base>
      <comp.Header1>Settings</comp.Header1>
      <comp.Panel>
        <comp.Input onChange={onChange} placeholder="Search..."/>
        {promiseInProgress ? <h1>Loading</h1> : <DisplaySettings/>}
        <Button onClick={handleLogOut}>Log Out</Button>
      </comp.Panel> 
    </comp.Base>
  );
}

/*
*/
