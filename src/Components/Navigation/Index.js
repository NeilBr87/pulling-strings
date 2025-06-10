import { useState } from 'react';
import Parties from '../Parties/Index.js'
import Posts from '../Posts/Index.js'
export default function Navigation() {

    const [picker, setPicker] = useState("");

    function listOfParties() {
        setPicker("parties")
    }

    function listOfPosts() {
        setPicker("posts")
    }

    return (
        <div>

            {picker === "" && <div>

                <button onClick={listOfParties}>List of parties</button>
                <button onClick={listOfPosts}>List of posts</button>

            </div>}

            {picker === "parties" && <Parties />} 
            {picker === "posts" && <Posts />} 
            
            

            
            
        </div>
    )
}