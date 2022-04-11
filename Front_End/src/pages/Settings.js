import React, { useState } from 'react'
import "../App.css";
import { Link } from "react-router-dom";

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
        description: "-------",
        tags: [],
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
        tags: ["date_format"],
      },
      {
        name: "Time Format",
        description: "the time of today",
        tags: [],
      },
      {
        name: "Time Zone",
        description: "the time zone of the location you're at",
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
    <div className='App'>
      <div className='containter mt-5'>
        <h1>
          <span>
            <button className='btn'>
              {" "}
              <span className>&lt;</span>Back{" "}
            </button>
            <h1 className='form-control mt-2 ml-20'>  Settings</h1> 
          </span>
        </h1>

        <input type="text" 
        className='search_button' 
        onChange={onChange}
        placeholder="Search..."
        />
        
        <div>
          {visibleOptions.map((option) =>(
          <div key={option.header.name}>
            <h3 className='title_border'>{option.header.name}</h3>
            <div className="border_list">
              {option.values.map((value) => (
                <div key={value.name} className="font-weight-bold">
                  <ul className='list-group'>
                    <li className='list-group-item mb-2'>
                      <h6 className='border_item'>{value.name}</h6>
                      <p className='item_description'>{value.description}</p>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
          ))}
        </div>
        <Link to="/">
        <button className='btn ml-24'>
            Log out
        </button>
        </Link>
      </div>
    </div>
  );
}
