import React from 'react'
import Cookies from 'js-cookie'

const GetCookie = () => {
  alert(Cookies.get("jwt"));
};

const RmCookie = () => {
  Cookies.remove("jwt")
  window.location.reload();
}

export default function Classroom() {
  return (
    <div className='logistic Management'>
      <nav>
        <ul>
          <li>home</li>
          <li>classroom</li>
        </ul>
      </nav>
      <div className='slide'></div>
      <div className='slide'>room2</div>
      <div className='slide'>room3</div>
      <button onClick={RmCookie}>log out</button>
    </div>
  )
}
