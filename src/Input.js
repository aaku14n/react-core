import React from "react";
import PropsType from "prop-types";
import "./Input.css";
import classNames from "classnames";
export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value ? props.value : "",
      isValidate: props.isOnlyAlphabet || props.isAlphaNumeric ? true : false,
      message: null
    };
  }
  onChange(value) {
    this.setState({ value });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }
  render() {
    let errorMessage;
    let tempClass = false;
    if (this.state.isValidate && this.state.value !== "") {
      if (this.props.isOnlyAlphabet && !/^[a-zA-Z]+$/.test(this.state.value)) {
        tempClass = true;
      } else if (
        this.props.isAlphaNumeric &&
        !/^[a-zA-Z0-9]+$/.test(this.state.value)
      ) {
        tempClass = true;
      }
    }
    let ClassName = classNames("Input-box", {
      inValid: tempClass,
      isValid: !tempClass
    });
    if (this.props.isOnlyAlphabet) {
      errorMessage = "Please Enter only Alphabets";
    } else if (this.props.isAlphaNumeric) {
      errorMessage = "No Spacial character allow";
    }
    return (
      <div
        className="Input"
        style={{
          width: `${this.props.width}px`,
          height: `${this.props.height}px`
        }}
      >
        {tempClass && <div className="toolTip">{errorMessage}</div>}
        <input
          type={this.props.type}
          className={ClassName}
          placeholder={this.props.placeholder}
          style={{
            backgroundColor: this.props.backgroundColor,
            color: this.props.color,
            fontSize: `${this.props.fontSize}px`
          }}
          value={this.props.value ? this.props.value : this.state.value}
          onChange={val => this.onChange(val.target.value)}
        />
      </div>
    );
  }
}
Input.propsType = {
  type: PropsType.string,
  width: PropsType.number,
  height: PropsType.number,
  backgroundColor: PropsType.string,
  placeholder: PropsType.string,
  value: PropsType.oneOf([PropsType.string, PropsType.number]),
  isOnlyAlphabet: PropsType.bool,
  isAlphaNumeric: PropsType.bool
};
Input.defaultProps = {
  type: "text",
  width: 200,
  height: 40,
  backgroundColor: "#fff",
  placeholder: "",
  value: "",
  isAlphaNumeric: false
};
