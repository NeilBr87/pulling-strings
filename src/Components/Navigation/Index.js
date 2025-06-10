import { useState } from 'react';
import './style.css'
import logo from './logo.png'
import KnowledgeBase from '../KnowledgeBase/Index.js'
import InterestContainer from '../InterestContainer/Index.js'
export default function Navigation() {

   const [knowledgeBase, setKnowledgeBase] = useState(false)

   function openKB() {
    setKnowledgeBase(true)
   }

    return (
        <div>

            {!knowledgeBase && 
            <div id="navPage">
                <img src={logo} alt="logo" style={{width: '50vw', height: '20vh'}} />
                <h1>Who's Pulling the Strings?</h1>
                <h4>A comprehensive tracker of special interests of Members of Parliament.</h4>
                <InterestContainer />
                <button id="kbButton" onClick={openKB}>Knowledge Base</button>            
            </div>}

            {knowledgeBase && <KnowledgeBase />}


        </div>
    )
}