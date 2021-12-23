import React from 'react'

const ButtonSmall = ({children, ...props}) => {
	return (
      <button className="button-small" {...props}>
			{children}
		</button>
   );
}

export default ButtonSmall;