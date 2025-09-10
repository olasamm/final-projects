import React from 'react'
import Navbar from '../components/Navbar'
import Submit from '../components/Submit'
import Welcome from '../components/Welcome'
import Students from '../components/Students'
import Lecturer from '../components/Lecturer'
import Card from '../components/Card'
import Review from '../components/Review'
import Footer from '../components/Footer'

const LandingPage = () => {
  return (
    <>
    <Navbar />
    <Submit />
    <Welcome />
    <Students />
    <Lecturer />
    <Card />
    <Review />
    <Footer />
    </>
  )
}

export default LandingPage