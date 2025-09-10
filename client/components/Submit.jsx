import React from 'react';
import './Submit.css';
import submit from '../src/assets/first.jpg'; 

const Submit = () => {
  return (
    <div className="container text-center mt-5">
      <div className="row align-items-center">
        <div className="col-lg-6 col-md-12 mb-4">
          <h4 className="mb-3">Submit Assignment</h4>
          <h4 className="mb-3">Easily & Get Instant</h4>
          <h4 className="mb-3">Feedback</h4>
        </div>


        <div className="col-lg-6 col-md-12">
          <img
            src={submit}
            alt="Submit Illustration"
            className="img-fluid rounded shadow professional-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Submit;