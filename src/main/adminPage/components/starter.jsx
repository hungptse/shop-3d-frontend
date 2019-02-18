import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getListAccountFromApi } from './starter.action.js';

const STARTER_STORE = 'STARTER_STORE';

const loadListAccountFromReducer = state => state[STARTER_STORE].listAccount;

const startSelector = createSelector(
    loadListAccountFromReducer,
    (listAccount) => ({ listAccount: listAccount || [] })
);


class Starter extends React.Component {
    //Chạy khi render xong mới chạy
    componentDidMount() {
        this.props.getListAccountFromApi && this.props.getListAccountFromApi();
    }

    render() {
        return (
                <div style={{
                    background: '#fff', padding: 24, margin: 0, minHeight: 280
                }}
                >
                    {this.props.listAccount.map((data, key) => (
                        <div key={key}>
                            {data.studentId}
                        </div>
                    ))}
                </div>
        );
    }
}

export default connect(startSelector, { getListAccountFromApi })(Starter);
