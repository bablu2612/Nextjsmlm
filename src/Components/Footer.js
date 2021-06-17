
import NextNProgress from "nextjs-progressbar";
import React from "react";
import Image from 'next/image'

const Footer = ({showloader}) => {
    return (<>
        <div className="footer-second">
            <h3 className="title">
                Footer Content is here
            </h3>
        </div>
        {showloader === true && 
        <div className="loader-main">
            <Image
                src="/page_loader.gif"
                width={200}
                height={200}
                alt="logo"
            />
        </div>
        }
    </>);
}
export default Footer