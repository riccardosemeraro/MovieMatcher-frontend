import React from 'react';
import { Link } from 'react-router-dom';
import '../style/matchList.css';

function MatchList() {
  const matches = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ];

  return (
    <div className="match-list">
      <h3>I tuoi match</h3>
      <div className="match-scroll">
        {matches.map(match => (
          <Link to={`/messages/${match.id}`} key={match.id} className="match-item">
            <img src={`https://example.com/avatar-${match.id}.jpg`} alt={match.name} />
            <p>{match.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MatchList;