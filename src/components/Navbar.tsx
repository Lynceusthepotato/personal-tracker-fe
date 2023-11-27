import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { useIsAuthenticated } from 'react-auth-kit';

type NavbarProps = {
    showModal: (visible:boolean, type?: number) => void;
    username?: string | null;
}

const Navbar = ({showModal, username} : NavbarProps) => {
    const [dropBar, setDropbar] = useState(false); 
    const isAuthenticated = useIsAuthenticated();

    return (
        <div className='is-navbar'>
            <NavLink to='/' className='left'>
                PERSONAL TRACKER
            </NavLink>
            <div className='right'>
                <div className='is-navbar-mobile'>
                    <FaBars onClick={() => setDropbar(!dropBar)} />
                </div>
                <NavLink to ='/home' className={({isActive}) => isActive ? 'is-navbar-link active' : 'is-navbar-link'}> HOME </NavLink>
                <NavLink to ='/finance' className={({isActive}) => isActive ? 'is-navbar-link active' : 'is-navbar-link'}> FINANCE </NavLink>
                <NavLink to ='/todo' className={({isActive}) => isActive ? 'is-navbar-link active' : 'is-navbar-link'}> TO-DO </NavLink>
                {isAuthenticated() ? <div className='is-navbar-link' onClick={() => showModal(true, 3)}> HELLO {username?.toUpperCase()} </div> : <div className='is-navbar-link' onClick={() => showModal(true, 1)}> LOGIN </div>}
            </div>
        </div>
    )
}

export default Navbar