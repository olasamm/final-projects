import React from 'react'
import './Lecturer.css';
import student from '../src/assets/third.jpg'; 

const Lecturer = () => {
  return (
    <>
    <section className="container-fluid text-center mt-5 px-3 px-md-5">
      <div className="row align-items-center">
        <div className="col-12 col-md-6">
          <img 
            src={student}
            alt="Student working on assignments" 
            className="img-fluid rounded shadow-lg animate-fade-in"
            style={{ maxWidth: '100%', height: 'auto', maxHeight: '500px' }} 
          />
        </div>


        <div className="col-12 col-md-6 my-5">
          <h4 className="fw-bold mx-4 " style={{ color: '#23194f' }} >For Lecturers</h4>
          <p className="mx-4 my-3 lecturer fs-6 text-muted">
            Easily manage assignments, track deadlines, <br />
             and provide feedback—all in one place. <br />
            Stay organized and streamline your teaching process. <br />
             Our platform is designed to make 
            teaching smoother and stress-free.  <br />
            Sign up today and empower your students!
            <h1></h1>
          </p>
          <button 
            type="button" 
            className="btn btn-primary rounded-pill px-4 py-2 shadow" style={{ background: '#23194f', color: 'white' }} 
          >
            Sign Up
          </button>
        </div>
      </div>
    </section>
    </>
  )
}

export default Lecturer