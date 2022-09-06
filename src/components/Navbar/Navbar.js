import React, { Component } from 'react';

// This makes it easier to call these item to make changes
const MenuItems = [
    {
        title: 'Home',
        url: '/',
        cName: 'nav-links',
    },
    {
        title: 'Dashboard',
        url: '/Dashboard',
        cName: 'nav-links',
    },
    {
        title: 'Weather',
        url: '/weather',
        cName: 'nav-links',
    },
    {
        title: 'Contact Us',
        url: '#',
        cName: 'nav-links',
    },
    {
        title: 'Sign In',
        url: '/signin',
        cName: 'nav-links-mobile',
    },
]

/* ---------------------------------------------------------------------------------------------------- */

const STYLES = [
    'btn--primary',
    'btn--outline'
]

const SIZES = [
    'btn--medium',
    'btn--large'
]

const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
}) => {
    //check if it includes buttonStyle and use it, but if not, default btn-primary
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

    return(
        <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type}>
            {children}
        </button>
    )
}
/* ---------------------------------------------------------------------------------------------------- */

export class Navbar extends Component {
    // this means it will start with hamburger. True will start with close("x")
    state = { clicked: false }

    handleClick = () => {
        {/* with each click switches between hamburger icon and close("x") */}
        this.setState({clicked: !this.state.clicked})
    }

    render() {
        require('./Navbar.css')
        return(
            <nav className="NavbarItems">
                <h1 className="navbar-logo">Syed's Garage<i class="fa-solid fa-gears"></i></h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    {/* this is to export the hamburger and close("x" icon) */}
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                {/* hides the menu options on mobile and display on full-screen */}
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                {/* these are the navbar item from MenuItems.js */}
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
                <Button>Sign In</Button>
            </nav>
        )
    }
}

export default Navbar