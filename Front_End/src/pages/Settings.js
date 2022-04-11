import React, { useState } from 'react'
import "../App.css";
import { Link } from "react-router-dom";
import * as comp from "../components/Settings_Components";
import { LinkButton } from '../components/Buttons';

export default function Settings() {
  const options= [
  {
    header: {
      name: "Notifications",
    },

    values: [
      {
      name: "Turn on/off notifications",
      description: "disable notifications...",
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
        description: "Pick a country....",
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
        description: "the date of today",
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
        description: "the time of today",
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
        description: "the time zone of the location you're at",
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
        description: "--> list of colours <--",
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
        description: "--> list of languages <--",
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
];

const [visibleOptions, setVisibleOptions] = useState(options);
const onChange=(e)=>{
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

  return (
    <comp.Base>
      <comp.Header1>Settings</comp.Header1>
      <comp.Panel>
        <comp.Input onChange={onChange} placeholder="Search..."/>
        {visibleOptions.map((option) =>(
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
          ))}
        <LinkButton page="/" title="Log Out"/>
      </comp.Panel> 
    </comp.Base>
  );
}
