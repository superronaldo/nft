import BigNumber from 'bignumber.js'
import React, { Fragment, useEffect, useState } from 'react'
import { useMatchBreakpoints } from '@pancakeswap/uikit'
import styled from 'styled-components';
import ConnectWalletButton from 'components/ConnectWalletButton';

const Header: React.FC = () => {

    const { isMobile } = useMatchBreakpoints()

    return (
        <header id="header container" >
            {/* Navbar */}
            <nav data-aos="zoom-out" data-aos-delay={800} className="headernav">

                <div className={!isMobile ? "socialmenu" : "socialmenu-mobile"}>
                  <ul>
                    <li>
                      <a href="https://twitter.com/great-dane-ai" target="_blank" rel="noreferrer">
                        <img src="img/social1.png" alt="" title="" />
                      </a>
                    </li>
                    <li>
                      <a href="https://opensea.io/collection/great-dane-ai" target="_blank" rel="noreferrer">
                        <img src="img/social3.png" alt="" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className={!isMobile ? "headercomponents" : "headercomponentsmobile"}>
                    <a href='https://www.GreatDane.online/'>
                        <img className="" style={{height:"70px"}} src="img/logo.png"  alt="sticky brand-logo" />
                    </a>
                    <span>
                        {/* <ConnectWalletButton headstring="Wallet ID:" colorHeading="#ffc000" colorAddress="#ffffff" colorIcon="primary" /> */}
                        <ConnectWalletButton />
                    </span>
                </div>
            </nav>
        </header>
    );
}

export default Header
