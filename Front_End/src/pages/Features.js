import React, { useState } from 'react'
import {Button} from "../components/Buttons";
import "../App.css";

export default function Features() {
  const options= [
  {
    header: {
      name: "Friends: ",
    },

    values: [
      {
        name: "Shared friend accounts list",
        description: "www.friends.com lol",
        tags: [],
      },
      {
        name: "Add friend",
        description: "",
        tags: [],
      },
      {
        name: "Search friends",
        description: "",
        tags: [],
      },
    ],
  },
];

const [profile_list, setProfileList] = useState(options);

 return (
    <div className='App'>
      <div className='containter mt-5'>
        <h1>
          <span>
            <h1 className='form-control mt-2 ml-20'> Features</h1> 
          </span>
        </h1>
        
        <div>
          {profile_list.map((option) =>(
          <div key={option.header.name}>
            <h3 className='title_border'>{option.header.name}</h3>
            <div className="border_list">
              {option.values.map((value) => (
                <div key={value.name} className="font-weight-bold">
                  <ul className='list-group'>
                    <li className='list-group-item mb-2'>
                      <Button>{value.name}</Button>
                      <p className='item_description'>{value.description}</p>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
          ))}
        </div>
      
      
      </div>
    </div>
  );

}
