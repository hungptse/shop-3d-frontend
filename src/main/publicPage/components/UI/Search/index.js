import _ from "lodash";
import faker from "faker";
import React, { Component } from "react";
import { Search } from "semantic-ui-react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { getListProductFromAPI } from "../../ProductPage/ProductPage.action";

const PRODUCT_PAGE_STORE = "PRODUCT_PAGE_STORE";
const loadListProductFromReducer = state => state[PRODUCT_PAGE_STORE].listProduct;


const startSelector = createSelector(
  loadListProductFromReducer,
  listProduct => ({ listProduct: listProduct || [] })
);

const getResults = () =>
  _.times(5, () => ({
    title: faker.company.companyName(),
    description: faker.company.catchPhrase(),
    image: faker.internet.avatar(),
    price: faker.finance.amount(0, 100, 2, "$")
  }));

const source = _.range(0, 3).reduce(memo => {
  const name = faker.hacker.noun();
  memo[name] = {
    name,
    results: getResults()
  };
  return memo;
}, {});


class SearchBar extends Component {

  componentWillMount() {
    this.resetComponent();
  }
  componentDidMount(){
    this.props.getListProductFromAPI && this.props.getListProductFromAPI();
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" });

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.title);

      const filteredResults = _.reduce(
        source,
        (memo, data, name) => {
          const results = _.filter(data.results, isMatch);
          if (results.length) memo[name] = { name, results }; // eslint-disable-line no-param-reassign
          return memo;
        },
        {}
      );

      this.setState({
        isLoading: false,
        results: filteredResults
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <div style={{}}>
        <Search
          category
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, {
            leading: true
          })}
          results={results}
          value={value}
          style={{ borderRadius: "0px 0px 0px 0px !important" }}
        />
      </div>
    );
  }
}

export default connect(startSelector,{getListProductFromAPI})(SearchBar);
