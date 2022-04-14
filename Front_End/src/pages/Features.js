import React, { useState, useEffect} from 'react'
import {trackPromise, usePromiseTracker} from "react-promise-tracker";
import {Button} from "../components/Buttons";
import {Get_Friends, Get_Profile_Identifier, Get_All_Profile_Identifier, Create_Friend, Delete_Friend} from "../auth/action/API_requests";
import "../App.css";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

export default function Features() {
  const [friends_list, setFriendsList] = useState([]);
  const [friends_search, setFriendsSearch] = useState([]);
  const [visible_friends, setVisibleFriends] = useState([]);

  useEffect(async () => {
    trackPromise(
      Update_Friends_Lists()
    );
  }, []);

  const Update_Friends_Lists = async () => {
    console.log("UPDATING");
    Get_All_Profile_Identifier().then(async (a_list) => {
      await Get_Friends().then(async (b_list) => {
        const list = [];
        b_list.forEach(async (IDs, index)=>{
          list[index] = a_list.find(({ID}) => ID === IDs.ID_2);
        });
        setFriendsList([...list]);
        setFriendsSearch([...a_list]);
      });
    })
  }

  const Add_Friend = async (friend) => {
    await Create_Friend(friend);
    await Update_Friends_Lists();
    console.log("Look");
    setVisibleFriends([...[]]);
  }

  const Remove_Friend = async (friend) => {
    await Delete_Friend(friend);
    await Update_Friends_Lists();
    console.log("Look");
    setVisibleFriends([...[]]);
  }

  function onChange(e){
    e.preventDefault();
    const value=e.target.value;
    if(value.trim().length === 0) {
      setVisibleFriends([]);
      return;
    }

    var index = 0;
    const returnedItems=[];
    friends_search.forEach((friend) => {
      if((friend.Username.toLocaleLowerCase().localeCompare(value.trim().toLowerCase()) == 0
      || friend.Name.toLocaleLowerCase().localeCompare(value.trim().toLowerCase()) == 0)
      && (friends_list.find(({ID}) => ID === friend.ID) == undefined 
      && friend.ID != JSON.parse(localStorage.getItem('user')).ID)){
        returnedItems[index++] = friend;
      }
    });

    setVisibleFriends(returnedItems);
  };

  const {promiseInProgress} = usePromiseTracker();

 return (
    <div className='App'>
      {promiseInProgress ? <ClimbingBoxLoader color={"black"} size={20}/> 
      : 
      <>
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
            <h3 className='form-control mt-2 ml-20'>{friend.Name}</h3>
            <Button onClick={Remove_Friend.bind(this, friend)}>Remove</Button>
          </div>
          ))}
        </div>
        <input onChange={onChange} placeholder="Search..."/>
        {visible_friends.map((friend) => (
            <div key={friend.ID}>
                <h6>{friend.Name}</h6>
                <Button onClick={Add_Friend.bind(this, friend)}>Add</Button>
            </div>
          ))}
      </div>
      </>}
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
