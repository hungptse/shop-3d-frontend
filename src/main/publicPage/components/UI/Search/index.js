import _ from "lodash";
import faker from "faker";
import React, { Component } from "react";
import { Search } from "semantic-ui-react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { getListCateFromAPI } from "./Search.action";

const SEARCH_STORE = "SEARCH_STORE";
const loadListCateFromReducer = state => state[SEARCH_STORE].listCate;

const startSelector = createSelector(
  loadListCateFromReducer,
  listCate => ({ listCate: listCate || [] })
);

class SearchBar extends Component {
  componentWillMount() {
    this.resetComponent();
  }
  componentDidMount() {
    this.props.getListCateFromAPI && this.props.getListCateFromAPI();
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" });

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title });

  reduceProduct = products => {
    var afterReduce = [];
    _.reduce(
      products,
      (obj, product) => {
        obj = {
          title: product.name,
          description: product.description,
          image: faker.internet.avatar(),
          price: product.price + "$"
        };
        afterReduce.push(obj);
      },
      {}
    );
    return afterReduce;
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });
    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const regex = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = product => regex.test(product.title);

      const arrayToObject = array =>
        array.reduce((obj, cate) => {
          obj[cate.id] = {
            name: cate.name,
            products: this.reduceProduct(cate.product)
          };
          return obj;
        }, {});

      const source = arrayToObject(this.props.listCate);

      const filteredResults = _.reduce(
        source,
        (result, value, key) => {
          let products = value.products;
          let results = _.filter(products, isMatch);
          let name = value.name;
          if (results.length) {
            result[name] = { name, results };
          }
          return result;
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

export default connect(
  startSelector,
  { getListCateFromAPI }
)(SearchBar);
