import React from 'react';
import './PostcodeDetails.css';

const PostcodeDetails = ({ details, postcode }) => {
  return (
    <div className="postcode-details card mt-4">
      <div className="card-body">
        <h2 className="card-title">Postcode Details for <span className="custom-heading">{ postcode }</span></h2>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><strong>Country:</strong> {details.country}</li>
          <li className="list-group-item"><strong>Longitude:</strong> {details.longitude}</li>
          <li className="list-group-item"><strong>Latitude:</strong> {details.latitude}</li>
          <li className="list-group-item"><strong>Admin District:</strong> {details.admin_district}</li>
        </ul>
      </div>
    </div>
  );
};

export default PostcodeDetails;
