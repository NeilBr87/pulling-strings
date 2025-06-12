import { useState } from 'react';
import Parties from '../Parties/Index.js'
import Posts from '../Posts/Index.js'
import Constituencies from '../Constituencies/Index.js'
import Departments from '../Departments/Index.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { faSitemap } from '@fortawesome/free-solid-svg-icons';

import './style.css'
export default function KnowledgeBase(props) {

    const [picker, setPicker] = useState("");

    function listOfParties() {
        setPicker("parties")
    }

    function listOfPosts() {
        setPicker("posts")
    }

    function listOfConstituencies() {
        setPicker("constituencies")
    }

    function listOfSpokespeople() {
        setPicker("spokespeople")
    }

    function listOfDepts() {
        setPicker("departments")
    }
    function kbBack() {
        props.setKnowledgeBase(false);
    }

    function constBack() {
        setPicker("")
    }


    return (
        <div>

            {picker === "" && <div>

                <h2>Knowledge Base</h2>

                <div className="kbRow">

                <div onClick={listOfParties} id="politicalParties">
                    <FontAwesomeIcon icon={faPeopleGroup} className="fontAwesomeImg" />
                    <p>Political parties</p>
                    <p>Full list</p>
                </div>
                
                <div onClick={listOfPosts} id="politicalPosts">
                    <FontAwesomeIcon icon={faSitemap} className="fontAwesomeImg" />
                    <p>Political posts</p>
                    <p>Full list</p>
                </div>

                </div>

                <div className="kbRow">

                <div onClick={listOfConstituencies} id="constituencies">
                    <FontAwesomeIcon icon={faPeopleGroup} className="fontAwesomeImg" />
                    <p>Constituencies</p>
                    <p>Full list</p>
                </div>
                
                <div onClick={listOfSpokespeople} id="spokespeople">
                    <FontAwesomeIcon icon={faSitemap} className="fontAwesomeImg" />
                    <p>Spokespeople</p>
                    <p>Full list</p>
                </div>


                </div>

                
                <div className="kbRow">

                <div onClick={listOfDepts} id="constituencies">
                    <FontAwesomeIcon icon={faPeopleGroup} className="fontAwesomeImg" />
                    <p>Departments</p>
                    <p>Full list</p>
                </div>
{/*                 
                <div onClick={listOfSpokespeople} id="spokespeople">
                    <FontAwesomeIcon icon={faSitemap} className="fontAwesomeImg" />
                    <p>Spokespeople</p>
                    <p>Full list</p>
                </div> */}


                </div>

                

                
                                <button onClick={kbBack} className="backButton">Back</button>

            </div>}

            {picker === "parties" && <Parties picker={picker} setPicker={setPicker} />} 
            {picker === "posts" && <Posts picker={picker} setPicker={setPicker}/>} 
            {picker === "constituencies" && <Constituencies picker={picker} setPicker={setPicker}/>}
            {picker === "spokespeople" && <div><h4 style={{marginTop: '10vh', color: 'red'}}>Under construction!</h4> <button className="backButton" onClick={constBack}>Back</button> </div>}
            {picker === "departments" && <Departments picker={picker} setPicker={setPicker}/>}

            
            
        </div>
    )
}