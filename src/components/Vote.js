import React from 'react';

const Vote = ({ score, onClick }) => (
  <div className="card-votes">
    <i onClick={() => onClick('up')} className="fas fa-chevron-up" />
    <div>{score}</div>
    <i onClick={() => onClick('down')} className="fas fa-chevron-down" />
  </div>
);

export default Vote;
