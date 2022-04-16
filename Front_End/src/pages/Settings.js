import React, { useEffect, useState } from 'react'
import "../App.css";
import { useNavigate } from "react-router-dom";
import * as comp from "../components/Settings_Components";
import {Button} from '../components/Buttons';
import auth from '../auth/auth';
import {trackPromise, usePromiseTracker} from "react-promise-tracker";
import { Get_Settings, Update_Settings } from '../auth/action/API_requests';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import {NoteTextArea} from "../components/Notes_Components";

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
              type: "Toggle",
              change: "Notification",
              to: "Enabled"
            },
            {
              title: "Off",
              type: "Toggle",
              change: "Notification",
              to: "Disabled"
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
                type: "OneToggle",
                change: "Country",
                to: "Canada"
              },
              {
                title: "USA",
                type: "OneToggle",
                change: "Country",
                to: "USA"
              },
              {
                title: "Romania",
                type: "OneToggle",
                change: "Country",
                to: "Romania"
              },
              {
                title: "Kenya",
                type: "OneToggle",
                change: "Country",
                to: "Kenya"
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
                type: "OneToggle",
                change: "Date_Format",
                to: "dd/mm/yyyy"
              },
              {
                title: "MM/DD/YY",
                type: "OneToggle",
                change: "Date_Format",
                to: "mm/dd/yyyy"
              }
            ],
            tags: ["date_format"],
          },
          {
            name: "Time Format",
            description: `${settings.Time_Format}`,
            buttons:[
              {
                title: "12:00pm",
                type: "OneToggle",
                change: "Time_Format",
                to: "12:00"
              },
              {
                title: "24:00",
                type: "OneToggle",
                change: "Time_Format",
                to: "24:00"
              }
            ],
            tags: [],
          },
          {
            name: "Time Zone",
            description: `${settings.TimeZone}`,
            buttons:[
              {
                title: "MT",
                type: "OneToggle",
                change: "TimeZone",
                to: "MT"
              },
              {
                title: "ET",
                type: "OneToggle",
                change: "TimeZone",
                to: "ET"
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
                type: "OneToggle",
                change: "Theme",
                to: "Light"
              },
              {
                title: "Dark",
                type: "OneToggle",
                change: "Theme",
                to: "Dark"
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
                type: "OneToggle",
                change: "Language",
                to: "English"
              },
              {
                title: "French",
                type: "OneToggle",
                change: "Language",
                to: "French"
              }
            ],
            tags: [],
          },
        ]
      },
    ]);
  }
  const [options, setOptions] = useState(create_options(null));
  const [visibleOptions, setVisibleOptions] = useState(options);
  const [report, setReport] = useState("");
  

  useEffect(() => {
    async function fetchData(){
      trackPromise(
        Get_Settings().then((settings) => {
          setOptions([...create_options(settings)]);
          setVisibleOptions([...create_options(settings)]);
        })
      );
    }
    fetchData();
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

const OnClickEvent = async (button) => {
  await trackPromise(Update_Settings({change:button.change, to:button.to}));
  await trackPromise(Get_Settings().then((settings) => {
    setOptions([...create_options(settings)]);
    setVisibleOptions([...create_options(settings)]);
  }));
}
  const {promiseInProgress} = usePromiseTracker();

  return (
    <comp.Base>
      <comp.Header1>Settings</comp.Header1>
      {promiseInProgress ? <ClimbingBoxLoader color={"black"} size={20}/> :
      <comp.Panel>
        <comp.Input onChange={onChange} placeholder="Search..."/>
        {visibleOptions.map((option, index) =>(
        <comp.Setting key={index}>
          <comp.Header3>{option.header.name}</comp.Header3>
          <comp.Body>
          {option.values.map((value) => (
              <div key={value.name}>
                  <comp.Header6>{value.name}</comp.Header6>
                  <comp.Description>{value.description}</comp.Description>
                  {value.buttons.map((button) => (
                    <div key={button.title}>
                      <comp.PickButton action={OnClickEvent.bind(this, button)} button={button}/>
                    </div>
                  ))}
              </div>
            ))}
          </comp.Body>
        </comp.Setting>
        ))};
        <comp.Header6>Report a Problem</comp.Header6>
        <comp.Description>Please type below your problem, and one of our developers will respond ASAP!</comp.Description>
        <NoteTextArea value = {report} placeholder="Send report here" onChange={(e)=>(setReport(e.target.value))}></NoteTextArea>
        <Button onClick={()=>{alert("Sending your report, thank you!"); setReport("")}}>Send Report</Button>
        <Button onClick={handleLogOut}>Log Out</Button>
      </comp.Panel>}
    </comp.Base>
  );
}
