import React from "react";
import PropTypes from "prop-types";

const MasonryGrid = (props) => {
  const columnWrapper = {};
  const result = [];

  // create columns
  for (let i = 0; i < props.columns; i++) {
    columnWrapper[`column_${i}`] = [];
  }

  // create columns from children
  for (let i = 0; i < props.children.length; i++) {
    const columnIndex = i % props.columns;
    columnWrapper[`column_${columnIndex}`].push(
      <div style={{ marginBottom: `${props.gap}px` }}>{props.children[i]}</div>
    );
  }

  // push final columns into result
  for (let i = 0; i < props.columns; i++) {
    result.push(
      <div
        key={i}
        style={{
          marginLeft: `${i > 0 ? props.gap : 0}px`,
          flex: 1
        }}
      >
        {columnWrapper[`column_${i}`]}
      </div>
    );
  }

  // return html with the result
  return <div style={{ display: "flex" }}>{result}</div>;
};

MasonryGrid.propTypes = {
  columns: PropTypes.number.isRequired,
  columnGap: PropTypes.number.isRequired,
  children: PropTypes.arrayOf(PropTypes.element)
};

MasonryGrid.defaultProps = {
  columns: 2,
  columnGap: 20
};

export default MasonryGrid;
