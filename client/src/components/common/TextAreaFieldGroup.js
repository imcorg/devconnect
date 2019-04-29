import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const TextAreaFieldGroup = ({
  name,
  value,
  error,
  info,
  placeholder,
  onChange,
  disabled
}) => {
  return (
    <div className='form-group'>
      <textarea
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className='form-text text-muted'>{info}</small>}
      {error && <div className='invalid-feedback'>{error}</div>}
    </div>
  )
}

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
}

export default TextAreaFieldGroup
