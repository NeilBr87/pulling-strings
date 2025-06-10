import { useState } from 'react';
import Donations from '../Donations/Index.js'
import './style.css'
export default function InterestContainer() {

    const [expanded, setExpanded] = useState(false);
    const [interestPicker, setInterestPicker] = useState("")
    
    function expand() {
        setExpanded(!expanded)
    }

    function openDonations() {
        if (interestPicker !== "Donations") {
            setInterestPicker("Donations")
        } else {
            setInterestPicker("")
        }
    }

    return (
        <div>
            <button id="interestOverview" onClick={expand}>Who's Paying Who?</button>

            {expanded && <div id="interestCol">
                            <p style={{fontSize: '12px'}}><i>From the Register of Members' Financial Interests as at 2 Jun 2025</i></p>

                {/* <button>Ad hoc payments</button>
                <button>Employment</button> */}
                <button className="interestButtons" onClick={openDonations}>Donations</button>
                {interestPicker === "Donations" && <Donations />}
                <button className="interestButtons" >Gifts, Benefits and hospitality - UK</button>
                <button className="interestButtons" >Gifts, Benefits and hospitality - Outside of UK</button>
            </div>}

            

        </div>
    )
}