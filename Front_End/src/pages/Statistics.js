import React from 'react'
import "../App.css"
import {Button} from "../components/Buttons";
import Months from '../components/Months';

export default function Statistics() {
  return (
    <>
    <h1>Statistics</h1>
    <div className='Statistics_box'>
    <div className='Statistics_header'> 2020 </div>
    <Button>2020</Button> 
    
    {<Months />}
    </div>

    <div className='Statistics_box'>
    <div className='Statistics_header'> 2021 </div>
    <Button>2021</Button>
    {<Months />}
    </div>

    <div className='Statistics_box'>
    <div className='Statistics_header'> 2022 </div>
    <Button>2021</Button>
    {<Months />}
    </div>
    </>
  )
}
