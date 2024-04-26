import React from 'react';
import './PostcodeHistory.css';

const PostcodeHistory = ({ history, selectedPostcode, onSelect, onRemove }) => {
  return (
    <div className="postcode-history card mt-4">
      <div className="card-body">
        <h2 className="card-title" onClick={() => onSelect(null)}>Postcode History</h2>
        <ul className="list-group list-group-flush">
          {history.map((postcode, index) => (
            <li
              key={index}
              className={`list-group-item d-flex justify-content-between align-items-center ${selectedPostcode === postcode ? 'selected' : ''}`}
              onClick={() => onSelect(postcode)}
            >
              <button className="btn btn-primary btn-sm">{postcode}</button>
              <button className="btn btn-danger btn-sm" onClick={() => onRemove(postcode)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostcodeHistory;
