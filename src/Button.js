import React from "react";
import "./Button.css";
export default class Button extends React.Component {
  onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
  render() {
    return (
      <div className="Button">
        <input
          type="submit"
          value={this.props.label}
          className="Button-input"
          onClick={() => this.onClick()}
          style={{
            width: `${this.props.width}px`,
            height: `${this.props.height}px`,
            backgroundColor: this.props.backgroundColor,
            color: this.props.color,
            fontSize: `${this.props.fontSize}px`
          }}
        />
      </div>
    );
  }
}
Button.defaultProps = {
  width: 100,
  height: 40,
  backgroundColor: "#1d671c",
  color: "#fff",
  label: "Submit",
  fontSize: 14
};
