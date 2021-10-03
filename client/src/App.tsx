import { Navigation } from "./navigation";
import { ApolloProvider } from "@apollo/client";
import { client } from "./api/graphql/client";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./redux";
import { Provider } from "react-redux";

const store = configureStore({
    reducer,
});

const App = () => (
    <ApolloProvider client={client}>
        <Provider store={store}>
            <Navigation />
        </Provider>
    </ApolloProvider>
);

export default App;
