import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import './style/Header.css'

function Header() {
    const { isAuthenticated } = useAuth();

    return (
        <div className="Header">
            <h2>Gamehub</h2>
            <nav>
                <ul>
                <li><Link to="/">About</Link></li>
                {!isAuthenticated && <li><Link to="/login">Login</Link></li>}
                    {isAuthenticated && (
                        <>  
                            <li><Link to="/forum">Forum</Link></li>
                            <li><Link to="/games">Games</Link></li>
                            <li><Link to="/users">Users</Link></li>
                            <li><Link to="/events">Events</Link></li>
                            <li><Link to="/profile">Profile</Link></li>
                            <li><Link to="/logout">Logout</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
}

export default Header;