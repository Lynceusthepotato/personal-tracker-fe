import React from 'react'
import { Link } from 'react-router-dom'
import CustomUnderLine from './CustomUnderLine'

const Footer = () => {
  return (
    <div className="is-footer-container">
        <div className="is-footer-top">
            <p>  This web app is exclusively created for learning experience. </p>
        </div>
        <CustomUnderLine middleStyle={{borderBottom: '1px solid black '}}/>
        <div className="is-footer-bottom">
            <div className='is-footer-bottom-left'>
              Personal Tracker
            </div>
            <div className='is-footer-bottom-right'>
              <div className='is-footer-contact'>
                <p> Contact Us </p>
                <p> (+65)55 5555 5555 </p>
                <p> Mon-Fri: 9AM - 5PM </p>
                <p> fake_email@personal.com </p>
              </div>
              <div className='is-footer-about'>
                <p> About Us </p>
                <Link to='/about' className='is-footer-link'> About Us </Link>
                <Link to='/privacy' className='is-footer-link'> Privacy </Link>
                <Link to='/support' className='is-footer-link'> Costumer Support </Link>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Footer