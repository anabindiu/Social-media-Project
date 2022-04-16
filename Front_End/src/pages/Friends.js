import React, { useState, useEffect} from 'react'
import {trackPromise, usePromiseTracker} from "react-promise-tracker";
import {Button} from "../components/Buttons";
import {Get_Friends, Get_All_Profile_Identifier, Create_Friend, Delete_Friend} from "../auth/action/API_requests";
import "../App.css";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";


export default function Friends() {
  const [friends_list, setFriendsList] = useState([]);
  const [friends_search, setFriendsSearch] = useState([]);
  const [visible_friends, setVisibleFriends] = useState([]);

  useEffect(() => {
    async function fetchData(){
      trackPromise(
        Update_Friends_Lists()
      );
    }
    fetchData();
  }, []);

  const Update_Friends_Lists = async () => {
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
    setVisibleFriends([...[]]);
  }

  const Remove_Friend = async (friend) => {
    await Delete_Friend(friend);
    await Update_Friends_Lists();
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
      if((friend.Username.toLocaleLowerCase().localeCompare(value.trim().toLowerCase()) === 0
      || friend.Name.toLocaleLowerCase().localeCompare(value.trim().toLowerCase()) === 0)
      && (friends_list.find(({ID}) => ID === friend.ID) === undefined 
      && friend.ID !== JSON.parse(localStorage.getItem('user')).ID)){
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
            <h1 className='form-control mt-2 ml-20'> Friends</h1> 
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