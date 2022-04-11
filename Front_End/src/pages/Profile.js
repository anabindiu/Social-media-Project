import React, { useState } from 'react'
import "../App.css";

export default function Profile() {
  const options= [
  {
    header: {
      name: "Profile pic upload: ",
    },

    values: [
      {
        name: "",
      }
    ],
  },
  {
    header: {
      name: "Name:",
    },
    values: [
      {
        name: "",
      }
    ],
  },
  {
    header: {
      name: "Birthday",
    },

    values: [
      {
        name: "DD-MM-YYYY",
      }
    ],
  },
  {
    header: {
      name: "Username",
    },

    values: [
      {
        name: "",
      }
    ]
  },
  {
    header: {
      name: "Email",
    },

    values: [
      {
        name: "",
      }
    ]
  },
  {
    header: {
      name: "Password",
    },

    values: [
      {
        name: "Add a password",
      }
    ]
  }
];

const [profile_list, setProfileList] = useState(options);

 return (
    <div className='App'>
      <div className='containter mt-5'>
        <h1>
          <span>
            <h1 className='form-control mt-2 ml-20'>  Profile</h1> 
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
                      <h6 className='border_item'>{value.name}</h6>
                      <input className='input_detail' placeholder= {value.description}></input>
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
