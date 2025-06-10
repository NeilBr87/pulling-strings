import { useState } from 'react';
import './style.css'
export default function InterestContainer() {

    const [expanded, setExpanded] = useState(false);

    function expand() {
        setExpanded(!expanded)
    }
    return (
        <div>
            <button id="interestOverview" onClick={expand}>Who's Paying Who?</button>

            {expanded && <div>
                {/* <button>Ad hoc payments</button>
                <button>Employment</button> */}
                <button>Donations</button>
                <button>Gifts, Benefits and hospitality - UK</button>
                <button>Gifts, Benefits and hospitality - Outside of UK</button>
            </div>}

        </div>
    )
}