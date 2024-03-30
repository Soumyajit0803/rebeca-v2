import React from 'react'
import './PujaHeading.css'

function PujaHeading({date, datetxt, customcss}) {
    var bgsetter = datetxt.toLowerCase()
    return (
        <div className={"eheading "+customcss}>
            <div className={`before ${datetxt.toLowerCase(bgsetter)}`}></div>
            <div className="big">{date}</div>
            <div className="small">
                <span>April</span>
                <span style={{ paddingLeft: "1rem", fontSize: "3rem" }}>{datetxt}</span>
            </div>
        </div>
    );
}

export default PujaHeading