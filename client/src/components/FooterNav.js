import React, {useState} from "react";
import { ReactComponent as Account } from "../assets/account.svg";
import { ReactComponent as Dashboard } from "../assets/dashboard.svg";
import { ReactComponent as Add } from "../assets/add.svg";
import { ReactComponent as Favourite } from "../assets/favourite.svg";
import { ReactComponent as Search } from "../assets/search.svg";
const FooterNav = () => {
    const [elementActive,setElementActive]= useState(false)
  return (
    <nav className="footernav">
      <Dashboard className="footernav__element" onClick={()=>{setElementActive(true)}}/>
      <Account className="footernav__element" onClick={()=>{setElementActive(true)}}/>
      <Search className="footernav__element" onClick={()=>{setElementActive(true)}}/>
      <Favourite className="footernav__element" onClick={()=>{setElementActive(true)}}/>
      <Add className="footernav__element" onClick={()=>{setElementActive(true)}}/>
    </nav>
  );
};

export default FooterNav;
