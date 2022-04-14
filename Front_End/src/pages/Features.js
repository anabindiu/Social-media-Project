import React, { useState, useEffect} from 'react'
import {trackPromise, usePromiseTracker} from "react-promise-tracker";
import {Button} from "../components/Buttons";
import {Get_Friends, Get_Profile_Identifier} from "../auth/action/API_requests";
import "../App.css";

export default function Features() {
  const [friends_list, setFriendsList] = useState([]);
  const [friends_search, setFriendsSearch] = useState([]);

  useEffect(async () => {
    trackPromise(
      Get_Friends().then((friend_list) => {
        setFriendsList([...friend_list]);
      })
    );
  }, []);

  const get_friend_info = async (ID) => {
    const friend = await Get_Profile_Identifier(ID);
    return friend;
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

 return (
    <div className='App'>
      <div className='containter mt-5'>
        <h1>
          <span>
            <h1 className='form-control mt-2 ml-20'> Features</h1> 
          </span>
        </h1>
        <div>
        <h1 className='form-control mt-2 ml-20'> Friends:</h1> 
          {friends_list.map((friend) =>(
          <div key={friend.ID}>
            <h3 className='title_border'>{get_friend_info(friend.ID).Name}</h3>
            <Button>Remove</Button>
          </div>
          ))}
        </div>
        <div>
        <input onChange={onChange} placeholder="Search..."/>
        </div>
      </div>
    </div>
  );

}

/*

const [options, setOptions] = useState(create_options(null));
  const [visibleOptions, setVisibleOptions] = useState(options);

  useEffect(async () => {
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

const OnClickEvent = async (button) => {
  console.log(button);
  await Update_Settings({change:button.change, to:button.to});
  await Get_Settings().then((settings) => {
    setOptions([...create_options(settings)]);
    setVisibleOptions([...create_options(settings)]);
  })
}

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
                    <comp.PickButton action={OnClickEvent.bind(this, button)} button={button}/>
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
        {promiseInProgress ? <ClimbingBoxLoader color={"black"} size={20}/> : <DisplaySettings/>}
        <Button onClick={handleLogOut}>Log Out</Button>
      </comp.Panel> 
    </comp.Base>
  );
}

*/
