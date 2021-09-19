
import './App.css';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import AppList from "./components/AppList";
import AddApp from "./components/AddApp";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>HELLO!</h1>
        <AppList />
        <AddApp />
      </div>
    </ApolloProvider>
  );
}

export default App;




























