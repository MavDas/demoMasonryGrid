import React, { Component } from "react";
import "./styles.css";
import MasonryGrid from "./masonryGrid.js";
import _ from "lodash";

export default class App extends Component {
  // create masonry grid component
  // pull masonry grid component in App component
  // process search in App component (input + API call)
  // pass result children to custom masonry grid component
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      searchResults: []
    };
    this.handleFetch = _.debounce(this.handleFetch, 1000);
  }

  handleOnChange = ({ target: { value } }) => {
    this.setState({
      searchInput: value
    });
    if (value.length > 2) {
      this.handleFetch(value);
    }
  };

  handleFetch = (value) => {
    fetch(`https://backend.picular.co/api/search?query=${value}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        this.setState({
          searchResults: response.colors
        });
      });
  };

  render() {
    const { searchInput, searchResults } = this.state;
    return (
      <div className="App">
        <label for="searchBox">Search Here</label>
        <input
          id="searchBox"
          type="text"
          style={{ padding: "5px", margin: "10px" }}
          onChange={this.handleOnChange}
          value={searchInput}
          placeholder="Start typing..."
        />
        <hr />
        <MasonryGrid columns={5} gap={20}>
          {searchResults.map((value, index) => {
            const height = 200 + Math.ceil(Math.random() * 300);
            return (
              <div
                key={`column_${index}`}
                style={{
                  height: `${height}px`,
                  backgroundColor: `${value.color}`
                }}
              >
                <div
                  style={{
                    top: "50%",
                    width: "fit-content",
                    margin: "0 auto",
                    position: "relative",
                    backgroundColor: "white"
                  }}
                >
                  {value.color}{" "}
                </div>
              </div>
            );
          })}
        </MasonryGrid>
      </div>
    );
  }
}
