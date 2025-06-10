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
                <div style={{backgroundColor: '#DBDBDB'}}>
                <img src={logo} alt="logo" style={{width: '30vw', height: '10vh'}} />
                <h1>Who's Pulling the Strings?</h1>
                <h4>A comprehensive tracker of special interests of Members of Parliament.</h4>
                </div>
                <div id="pageImage"><p>"Money in politics is like water running downhill -- it finds its way."</p><p>- Jonathan Alter</p></div>
                <h2>Menu</h2>
                <InterestContainer />
                <button id="kbButton" onClick={openKB}>Knowledge Base</button>            
            </div>}

            {knowledgeBase && <KnowledgeBase knowledgeBase={knowledgeBase} setKnowledgeBase={setKnowledgeBase} />}


        </div>
    )
}