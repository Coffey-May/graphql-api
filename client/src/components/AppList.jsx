import React from "react";
import { gql} from "apollo-boost";
import { graphql } from "react-apollo";


// import getApps from "../queries/queries"

const getApps = gql`
  {
    apps {
      id
      name
    }
  }
`;
const getStages = gql`
  {
    stages {
      id
      name
    }
  }
`;

const AppList = ({ data }) => {
  const showApps = () => {
    if (data.loading) {
      return <div>Loading...</div>;
    } else {
      return data.apps.map((app) => {
        return (
          <div key={app.id}>
            <h4>{app.name}</h4>
            <button
              // onClick={(e)=> deleteApp({id:e.target.id})}
              value={app.id}
            >
              Delete App
            </button>
            <button value={app.id}>Update App</button>
          </div>
        );
      });
    }
  };

  return (
    <div>
      <div>{console.log(data.stages)}</div>
      {showApps()}
    </div>
  );
};

export default graphql(getApps)(AppList);
