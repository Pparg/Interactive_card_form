import './App.css';
import React, { useEffect } from 'react';
import { useState } from 'react';

export function Main(params) {
  let [width, setWidth] = useState(window.innerWidth)
  let [cardInfo, setCardInfo] = useState({
    name : "",
    number: "",
    expiration_month: "",
    expiration_year: "",
    cvc : "",
  })
  let [validate, setValidate]= useState(false)
  let defaultCardInfo ={
    name: "Jane Appleseed",
    number: "1234 5678 9123 0000",
    expiration_month : "00",
    expiration_year:"00",
    cvc : "000" 
  }
  useEffect(()=>{
    function handleResize(){
      setWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)},[width])
  let handleSubmit =(e)=>{
    e.preventDefault()
    if(cardInfo.name.match(/[0-9]/)|| cardInfo.number.match(/[^0-9]/)|| cardInfo.expiration_month.match(/[^0-9]/)||cardInfo.expiration_year.match(/[^0-9]/)|| cardInfo.cvc.match(/[^0-9]/)){
      setValidate(false)
    }
    else{
      setValidate(true)
    }

  }
  let reset =()=>{
    setCardInfo({
      name : "",
      number: "",
      expiration_month: "",
      expiration_year: "",
      cvc : "",
    })
    setValidate(false)
  }
  return(
  <div className={width>850?'desktop_main_container':"mobile_main_container"}>
    <div className={width>850? "card_container":"card_container_mobile"}>
      <div className='card_front'>
        <div className='circle_container'>
          <div className='big_circle'></div>
          <div className='little_circle'></div>
        </div>
        <div className='card_information'>
          <p className='card_number'>{cardInfo.number===""? defaultCardInfo.number : cardInfo.number}</p>
          <div className='card_name_expiration'>
            <p>{cardInfo.name===""? defaultCardInfo.name : cardInfo.name}</p>
            <p>{`${cardInfo.expiration_month===""? defaultCardInfo.expiration_month:cardInfo.expiration_month}/${cardInfo.expiration_year===""? defaultCardInfo.expiration_year: cardInfo.expiration_year}`}</p>
          </div>
        </div>
      </div>
      <div className='card_back'>
        <p>{cardInfo.cvc===""? defaultCardInfo.cvc: cardInfo.cvc}</p>
      </div>
    </div>
    <div className={validate?"complete_form":'form_container'}>
      <form onSubmit={handleSubmit}>
        <label>CardHolder Name
          <input className={cardInfo.name.match(/[0-9]/)?"wrong_input":"correct_input"} type="text" placeholder='e.g. Jane Appleseed' required value={cardInfo.name} onChange={(e)=>setCardInfo({...cardInfo, name: e.target.value})}></input>
          <p className='wrong_data'>{cardInfo.name.match(/[0-9]/)? "Wrong format, leters only" : ""}</p>
        </label>
        <label>Card Number
          <input className={cardInfo.number.match(/[^0-9]/)? "wrong_input":"correct_input"} type="text" maxLength="16" placeholder='e.g. 1234 5678 9123 0000' required value={cardInfo.number} onChange={(e)=> setCardInfo({...cardInfo, number: e.target.value})}></input>
          <p className='wrong_data'>{cardInfo.number.match(/[^0-9]/)? "Wrong format, numbers only" : ""}</p>
        </label>
        <label>EXP. DATE (MM/YY) & CVC
          <div className='special_label'>
            <div className='special_label_input'>
              <input className={cardInfo.expiration_month.match(/[^0-9]/)?"wrong_input":"correct_input"} type="text" maxLength="2" required value={cardInfo.expiration_month} placeholder="DD" onChange={(e)=>setCardInfo({...cardInfo, expiration_month: e.target.value})}></input>
              <p className='wrong_data'>{cardInfo.expiration_month.match(/[^0-9]/)? "Wrong format, numbers only":""}</p>
            </div>
            <div className='special_label_input'>
              <input className={cardInfo.expiration_year.match(/[^0-9]/)?"wrong_input":"correct_input"} type="text" maxLength="2" required value={cardInfo.expiration_year} placeholder="YY" onChange={(e)=>setCardInfo({...cardInfo, expiration_year: e.target.value})}></input>
              <p className='wrong_data'>{cardInfo.expiration_year.match(/[^0-9]/)? "Wrong format, numbers only":""}</p>
            </div>
            <div className='special_label_input_last'>
              <input className={cardInfo.cvc.match(/[^0-9]/)?"wrong_input":"correct_input"} type="text" maxLength="3" placeholder='e.g. 123' required value={cardInfo.cvc} onChange={(e)=>{setCardInfo({...cardInfo, cvc: e.target.value})}}></input>
              <p className='wrong_data'>{cardInfo.cvc.match(/[^0-9]/)? "Wrong format, numbers only":""}</p>
            </div>
          </div>
         </label>
        <button >Confirm</button>
      </form>
      
    </div>
    <div className={validate? "open":"closed"}>
      <div className='logo'></div>
      <h1>Thanks You!</h1>
      <p>We've added your card details</p>
      <button onClick={reset}>Continue</button>
    </div>


  </div>)

  
}
