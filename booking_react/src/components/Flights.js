import {useState, useEffect} from 'react';

const Flights = ({setUser}) => {
    let mySavedUser = localStorage.getItem('user');
    if(mySavedUser != null){
        mySavedUser = JSON.parse(mySavedUser);
        console.log(mySavedUser);
    }
    return(
        <div>
         
        </div>
    )
}

export default Flights;