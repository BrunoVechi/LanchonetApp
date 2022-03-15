import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { FetchIngrediente } from './components/FetchIngrediente';
import { AddIngrediente } from './components/AddIngrediente';
import { FetchLanche } from './components/FetchLanche';
import { AddLanche } from './components/AddLanche';
import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>            
                <Route path='/fetch-ingrediente' component={FetchIngrediente} />
                <Route path='/add-ingrediente' component={AddIngrediente} />
                <Route path='/ingrediente/edit/:id' component={AddIngrediente} />
                <Route path='/fetch-lanche' component={FetchLanche} />
                <Route path='/add-lanche' component={AddLanche} />
                <Route path='/lanche/edit/:id' component={AddLanche} />
            </Layout>
        );
    }
}
