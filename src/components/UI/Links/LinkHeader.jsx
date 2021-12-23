import React from 'react';
import { useHistory } from 'react-router';
import { ChevronRight } from 'react-bootstrap-icons';

const LinkHeader = ({ children, ...props }) => {
   let router = useHistory();

   return (
      <div
         className="title link-header mb-3"
         onClick={() => router.push(`/collections/${props.collection}`)}
      >
         {children}
         <ChevronRight className="ms-2" />
      </div>
   );
};

export default LinkHeader;
