import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./Grid.css";

// Give Max width for devices in pixel
const MOBILE_DEVICE_WIDTH = 768;
const TABLATE_DEVICE_WIDTH = 1024;

class GridCard extends React.Component {
  componentDidMount() {
    if (this.props.saveCardHeight) {
      let height = this.divElement.clientHeight;
      this.props.saveCardHeight(height, this.props.index);
    }
    window.addEventListener("resize", () => this.updateDimensions());
  }
  updateDimensions() {
    let height = this.divElement.clientHeight;
    this.props.saveCardHeight(height, this.props.index);
  }
  setHeightOnload() {
    if (this.props.saveCardHeightOnLoad) {
      let height = this.divElement.clientHeight;
      this.props.saveCardHeightOnLoad(height, this.props.index);
    }
  }
  render() {
    const className = classNames("Grid-Card", {
      "Grid-Card-variableHeight": this.props.gridType === 1
    });
    return (
      <div
        className={className}
        ref={divElement => (this.divElement = divElement)}
        onLoad={() => this.setHeightOnload()}
        style={{
          width: `${this.props.width}%`,
          height: "auto",
          padding: this.props.margin,
          top: this.props.top,
          left: `${this.props.left * this.props.width}%`
        }}
      >
        {this.props.item}
      </div>
    );
  }
}

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.gridCardWidth = window.innerWidth;
    this.column = null;
    this.gridCardHeight = [];
    this.state = {
      width: this.gridCardWidth,
      cardsHeight: []
    };
  }
  updateDimensions() {
    this.setState({ width: window.innerWidth });
    this.setState({ cardsHeight: this.gridCardHeight });
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", () => this.updateDimensions());
    this.setState({ cardsHeight: this.gridCardHeight });
  }
  saveCardHeightOnLoad(height, index) {
    this.gridCardHeight[index] = height;
    this.setState({ cardsHeight: this.gridCardHeight });
  }
  saveCardHeight(height, index) {
    if (index === 0) this.gridCardHeight = [];
    this.gridCardHeight.push(height);
  }

  getTop(index, col) {
    if (index < 0) return 1;
    else {
      return (
        (this.gridCardHeight[index - col]
          ? this.gridCardHeight[index - col]
          : 0) + this.getTop(index - col, col)
      );
    }
  }
  getMaxHeight(column) {
    if (this.props.gridType === 1) {
      var totalHeight = [];
      for (let i = column; i > 0; i--)
        totalHeight.push(
          this.getTop(this.gridCardHeight.length - i, column) +
            this.gridCardHeight[this.gridCardHeight.length - i] +
            this.props.margin / 2
        );
      let returnHeight = _.reverse(_.sortBy(totalHeight))[0];
      if (isNaN(returnHeight)) return "auto";
      else return returnHeight;
    } else return "auto";
  }
  render() {
    // for desktop screen
    if (TABLATE_DEVICE_WIDTH <= this.state.width) {
      this.gridCardWidth = 100 / this.props.gridForLarge;
      this.column = this.props.gridForLarge;
    }
    // for tablate screen
    if (
      MOBILE_DEVICE_WIDTH < this.state.width &&
      this.state.width < TABLATE_DEVICE_WIDTH
    ) {
      this.gridCardWidth = 100 / this.props.gridForMedium;
      this.column = this.props.gridForMedium;
    }
    // for mobile screen
    if (320 < this.state.width && this.state.width < MOBILE_DEVICE_WIDTH) {
      this.gridCardWidth = 100 / this.props.gridForSmall;
      this.column = this.props.gridForSmall;
    }
    // for spacing btw the grid-Cards
    const margin = this.props.margin / 2;
    return (
      <div
        className="Grid"
        style={{
          padding: `${this.props.margin / 2}px`,
          background: this.props.background,
          height: this.getMaxHeight(this.column)
        }}
      >
        <div className="Grid-buffer">
          {this.props.children.map((item, index) => (
            <GridCard
              key={index}
              item={item}
              index={index}
              width={this.gridCardWidth}
              margin={margin}
              gridType={this.props.gridType}
              left={index % this.column}
              saveCardHeight={
                this.props.gridType
                  ? (cardHeight, index) =>
                      this.saveCardHeight(cardHeight, index)
                  : null
              }
              saveCardHeightOnLoad={
                this.props.gridType
                  ? (cardHeight, index) =>
                      this.saveCardHeightOnLoad(cardHeight, index)
                  : null
              }
              top={this.props.gridType ? this.getTop(index, this.column) : null}
            />
          ))}
        </div>
      </div>
    );
  }
}
Grid.propTypes = {
  children: PropTypes.array,
  gridForSmall: PropTypes.number,
  gridForMedium: PropTypes.number,
  gridForLarge: PropTypes.number,
  margin: PropTypes.number,
  gridType: PropTypes.number,
  background: PropTypes.string
};

Grid.defaultProps = {
  gridForSmall: 1,
  gridForMedium: 2,
  gridForLarge: 4,
  gridType: 0,
  margin: 10,
  background: "#FFFFFF"
};

GridCard.propTypes = {
  width: PropTypes.number,
  margin: PropTypes.number,
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gridType: PropTypes.number,
  saveCardHeight: PropTypes.func,
  saveCardHeightOnLoad: PropTypes.func
};
GridCard.defaultProps = {
  margin: 10,
  gridType: 1,
  width: 100,
  left: "initial",
  top: "initial"
};
