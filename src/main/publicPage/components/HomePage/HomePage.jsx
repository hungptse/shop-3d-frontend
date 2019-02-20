import React from "react";
// import { connect } from "react-redux";
// import { createSelector } from "reselect";

const LIST_EVENTS_STORE = "LIST_EVENTS_STORE";

const loadListEventsFromReducer = state => state[LIST_EVENTS_STORE].listEvents;
const loaddingRequestFromReducer = state => state[LIST_EVENTS_STORE].loading;

// const startSelector = createSelector(
//   loadListEventsFromReducer,
//   loaddingRequestFromReducer,
//   (listEvents, loading) => ({
//     listEvents: listEvents || [],
//     loading: loading
//   })
// );

class HomePage extends React.Component {
  //   componentDidMount() {
  //     this.props.getListEventsFromAPI && this.props.getListEventsFromAPI();
  //   }

  render() {
    return (
      <div>
        Home Page
      </div>
    );
  }
}

export default HomePage;
