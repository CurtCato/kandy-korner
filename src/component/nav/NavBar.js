import React, { Component } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"


export default class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Stores</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/candy">Candy List</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/employee">Employees</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}
