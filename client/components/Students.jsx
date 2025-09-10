import React from 'react'
import './Student.css';
import student from '../src/assets/third.jpg'; 

const Students = () => {
  return (
    <>
     <section className="container-fluid text-center mt-5 px-3 px-md-5">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 my-5">
          <h4 className="fw-bold mx-4 " style={{ color: '#23194f' }} >For Students</h4>
          <p className="mx-4 my-3 student fs-6 text-muted">
            Easily submit your assignments, track deadlines, <br /> and receive feedback—all in one place. <br />
            Stay organized and never miss a deadline again. <br />
             Our platform is designed to make learning <br />
            smoother and stress-free. Sign up today and stay ahead!
          </p>
          <button 
            type="button" 
            className="btn  rounded-pill px-4 py-2 shadow" style={{ background: '#23194f', color: 'white' }} 
          >
            Sign Up
          </button>
        </div>

      
        <div className="col-12 col-md-6">
          <img 
            src={student}
            alt="Student working on assignments" 
            className="img-fluid rounded shadow-lg animate-fade-in"
            style={{ maxWidth: '100%', height: 'auto', maxHeight: '500px' }} 
          />
        </div>
      </div>
    </section>
    </>
  )
}

export default Students