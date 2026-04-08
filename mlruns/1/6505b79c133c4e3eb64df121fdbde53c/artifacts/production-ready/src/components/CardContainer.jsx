import React from 'react';

const CardContainer = ({ children }) => {
  return <div className="flex flex-col bg-white shadow-lg">{children}</div>;
};

export default CardContainer;