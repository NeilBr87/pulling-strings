import { useState } from 'react';
import './style.css'
import logo from './logo.png'
import KnowledgeBase from '../KnowledgeBase/Index.js'
import Voting from '../Votes/Index.js'
import InterestContainer from '../InterestContainer/Index.js'
export default function Navigation() {

   const [knowledgeBase, setKnowledgeBase] = useState(false)
    const [contact, setContact] = useState(false)
    const [voting, setVoting] = useState(false)
   function openKB() {
    setKnowledgeBase(true)
   }

   function openContact() {
    setContact(!contact)
   }

   function openVoting() {
    setVoting(true)
   }

    return (
        <div>

            {!knowledgeBase && !voting && 
            <div id="navPage">
                <div style={{backgroundColor: '#DBDBDB'}}>
                <img src={logo} alt="logo" style={{width: '30vw', height: '10vh'}} />
                <h1>Who's Pulling the Strings?</h1>
                <h4>A comprehensive tracker of special interests of Members of Parliament.</h4>
                </div>
                <div id="pageImage"><p>"Money in politics is like water running downhill -- it finds its way."</p><p>- Jonathan Alter</p></div>
                <h2>Menu</h2>
                <InterestContainer />
                <button id="voteButton" onClick={openVoting}>Commons vote tracker</button>
                <button id="lordsButton">Lords Voting Tracker</button>
                <button id="kbButton" onClick={openKB}>Knowledge Base</button>
                <button id="contactButton" onClick={openContact}>Contact</button>
                {contact && <div style={{marginTop: '4vh'}}>Feel free to get in contact with me via my <a style={{  textDecoration: 'none', fontWeight: 'bold'}} href="https://neil-brooks-portfolio.netlify.app/portfoliopage">Portfolio</a></div>}

            </div>}

            {knowledgeBase && <KnowledgeBase knowledgeBase={knowledgeBase} setKnowledgeBase={setKnowledgeBase} />}
            {voting && <Voting knowledgeBase={knowledgeBase} setKnowledgeBase={setKnowledgeBase} />}
            

        </div>
    )
}