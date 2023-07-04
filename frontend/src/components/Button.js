import React from 'react'
import PropTypes from 'prop-types'


const Button = (props) => {
  return (
    <div>
      <button className={props.class}  onClick={props.func}>{props.value}</button>
    </div>
  )
}

Button.propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
}

export default Button
