import React from 'react'
import { PlayBtn } from "react-bootstrap-icons";

const ButtonPlay = ({children, ...props}) => {
	return (
      <button className="button-play" {...props}>
			<PlayBtn className="me-2" />{children}
		</button>
   );
}

export default ButtonPlay;
