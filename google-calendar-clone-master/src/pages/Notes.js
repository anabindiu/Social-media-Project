import React, { useState } from 'react'
import "../App.css";

export default function Notes() {
  const options= [
  {
    header: {
      name: "Add new note",
    },

    values: [
      {
        name: "Date created:",
        description: "DD-MM-YYYY",
        tags: [],
      },
      {
        name: "Title:",
        description: "",
        tags: [],
      },
      {
        name: "Content",
        description: "--> Fill in this space <--",
        tags: [],
      },
      {
        name: "Edit",
        description: "",
        tags: [],
      },
      {
        name: "Delete",
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
            <button className='btn'>
              {" "}
              <span className>&lt;</span>Back{" "}
            </button>
            <h1 className='form-control mt-2 ml-20'>  Notes</h1> 
          </span>
        </h1>
        
        <div>
          {profile_list.map((option) =>(
          <div key={option.header.name}>
            <button className='btn ml-20'>{option.header.name}</button>
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
              
      
      
      </div>
    </div>
  );

}
