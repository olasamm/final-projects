import React from 'react';
import './Card.css';

const Card = () => {
  return (
    <section className="card-section py-5">
      <div className="container">
        <div className="row gap-4 justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title fw-bold mt-4 mb-3">Students</h5>
                <p className="card-text">
                  Submit Assignments <br />
                  Track Deadlines <br />
                  Receive Feedback & Grades <br />
                  Resubmit <br />
                  Stay Organized
                </p>
              </div>
            </div>
          </div>


          <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title fw-bold mt-4 mb-3">Lecturer</h5>
                <p className="card-text">
                  Create & Manage Assignments <br />
                  Receive & Review Submissions <br />
                  Grade & Provide Feedback <br />
                  Track Student Progress <br />
                  Communicate with Students
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;