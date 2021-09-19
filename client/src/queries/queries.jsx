import gql from 'apollo-boost';

export const getApps = gql`
  {
    apps {
      id
      name
    }
  }
`;


// export { getApps }