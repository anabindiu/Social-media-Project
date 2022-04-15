import React from 'react'
import { useState } from 'react';
import "../App.css"
import {Button} from "../components/Buttons";
import Months from '../components/Months';

export default function Statistics() {

  const [year, setYear] = useState("");
  return (
    <>
    <div className='Statistics_box'>
    <div className='Statistics_header'> 2022 </div>
    {<Months year={2022}/>}
    </div>

    <div className='Statistics_box'>
    <div className='Statistics_header'> 2021 </div>
    {<Months year={2021}/>}
    </div>

    <div className='Statistics_box'>
    <div className='Statistics_header'> 2020 </div>
    {<Months year={2020}/>}
    </div>
    </>
  )
}
