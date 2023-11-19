import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars } from "react-icons/fa";

type NavbarProps = {
    openModal?: (visible:boolean, type?: number) => void,
}

const Navbar = ({openModal} : NavbarProps) => {
    const [dropBar, setDropbar] = useState(false); 

    const handleModal = () => {
        if (typeof(openModal) === 'function') {
            openModal(true, 1);
        }
    }

    return (
        <div className='is-navbar'>
            <div className='left'>
                PERSONAL TRACKER
            </div>
            <div className='right'>
                <div className='is-navbar-mobile'>
                    <FaBars onClick={() => setDropbar(!dropBar)} />
                </div>
                <NavLink to ='/' className={({isActive}) => isActive ? 'is-navbar-link active' : 'is-navbar-link'}> HOME </NavLink>
                <NavLink to ='/finance' className={({isActive}) => isActive ? 'is-navbar-link active' : 'is-navbar-link'}> FINANCE </NavLink>
                <NavLink to ='/todo' className={({isActive}) => isActive ? 'is-navbar-link active' : 'is-navbar-link'}> TO-DO </NavLink>
                <div className='is-navbar-link' onClick={handleModal}> LOGIN </div>
            </div>
        </div>
    )
}

export default Navbar