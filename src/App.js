import React, { Component } from 'react';
import indexRoutes from './router/index.jsx';
import { renderRoutes } from './components/route';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';

import { store } from './store';


const appStore = store.configureStore();

class App extends Component {

    render() {
        return (
            <Provider store={appStore}>
                <BrowserRouter>
                    {/* <Layout> */}
                        {renderRoutes(indexRoutes, "")}
                    {/* </Layout> */}
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
