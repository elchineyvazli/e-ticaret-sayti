import React from 'react'
import { Link, Outlet } from 'react-router'

function About() {
    return (
        <div>
            <Link to="students">Students</Link>
            <Link to="staffs">Staffs</Link>
            <Outlet />
        </div>
    )
}

export default About