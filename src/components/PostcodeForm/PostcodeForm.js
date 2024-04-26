import React, { useState } from 'react';
import './PostcodeForm.css';

const PostcodeForm = ({ onSubmit }) => {
  const [postcode, setPostcode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(postcode);
    setPostcode('');
  };

  return (
    <form onSubmit={handleSubmit} className="postcode-form mb-4">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter UK Postcode"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </form>
  );
};

export default PostcodeForm;
