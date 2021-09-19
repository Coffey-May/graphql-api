import React from 'react';
import {gql} from 'apollo-boost';
import { graphql } from 'react-apollo';


const getEvents = gql`
{
    events{
        id
        name
    }
}`
const AddApp = (props) => {

   console.log(props)
    return (

        <div>
           <form action="">
               <h4>Add an App</h4>
                <div>
                    <label className="field"></label>
                    <input type="text" />
                </div>
                <div>
                    <label className="field"></label>
                    <input type="text" />
                </div>
                 
                <button type="submit">+</button>
           </form>

        </div> 
    )
};

export default graphql(getEvents)(AddApp)