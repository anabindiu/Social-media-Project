import React from 'react'
import "../App.css"
import Months from '../components/Months';

export default function Statistics() {
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
