import BigNumber from 'bignumber.js'
import React, { Fragment, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { useMatchBreakpoints } from '@pancakeswap/uikit'
import ape from "config/apeabi.json";
import StandardContractABI from "config/StandardContract.json";
import {
  useApeContract
} from 'hooks/useContracts'
import {
    getApeAddress,
    getStandardAddress,
} from "utils/addressHelper";
import { useWeb3 } from 'hooks/useWeb3'
import { mint } from 'utils/callHelper'
import useRefresh from 'hooks/useRefresh'
import { getFullDisplayBalance } from 'utils/formatBalance'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRefresh } from '@fortawesome/free-solid-svg-icons'

const StyledRightArrowButton = styled.div`
  color: white;
  width: 0px;
  height: 0px;
  border: 30px solid black;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: white;
  cursor:pointer;
`

const StyledLeftArrowButton = styled.div`
  color: white;
  width: 0px;
  height: 0px;
  border: 30px solid black;
  border-top-color: transparent;
  border-right-color: white;
  border-bottom-color: transparent;
  border-left-color: transparent;
  cursor: pointer;
`

const Home: React.FC = () => {

  const [validChainid, setValidChainId] = useState(137)

  const web3 = useWeb3()
  const { account } = useWeb3React()
  const [requestedMint, setRequestedMint] = useState(false)
  // const [mintEnable, setStep] = useState(false)
  const apeContract = useApeContract()

  const {fastRefresh} = useRefresh()

  const [redraw, setRedraw] = useState(false)

  // added for minting NFT
  const [maxSupply, setMaxSupply] = useState(0)
  const [totalSupply, setTotalSupply] = useState(0)
  const [mintNum, setMintNum] = useState<number>(1);
  const [mintprice, setMintPrice] = useState(0)
  const [chainid, setChainID] = useState(0)
   
  const { isMobile } = useMatchBreakpoints()

  useEffect( () => {

    const fetchMintPrice = async () => {
      const price = await apeContract.methods._price().call();
      setMintPrice(price);
    }

    // const findWhiteList = (address:string) => {
    //   let  isWhiteList = false;
      
    //   for (let i = 0 ; i < whitelist.length ; i++){
      
    //     if (whitelist[i] === address){
          
    //       isWhiteList = true;
    //       break;
    //     }
        
    //   }
    //     return isWhiteList;
    // }

    // const getStep = async () => {
    //   const shark = await apeContract.methods.step().call();
    
    //   if (shark === "2"){
    //     if(findWhiteList(account))
    //       setStep(false);
    //     else
    //       setStep(true);
    //   }
    //   else
    //     setStep(false);
    // }
  
    const fetchChainId = async () => {
      // apeContract.methods.
      if(web3.eth) {
        const _chainid = await web3.eth.getChainId();
        setChainID(_chainid)
      }
    }

    const fetchMaxSupply = async () => {
      const _maxSupply = await apeContract.methods.MAX_NFT_SUPPLY().call();
      setMaxSupply(_maxSupply);      
    }

    const fetchTotalSupply = async () => {
      const _totalSupply = await apeContract.methods.tokenMinted().call();
      setTotalSupply(_totalSupply);      
    }

    if(apeContract) {
      fetchMintPrice();
      fetchChainId();
      fetchMaxSupply();
      fetchTotalSupply();
      // getStep();
    }
  
  }, [web3.eth, apeContract, account])


  useEffect( () => {
    const fetchTotalSupply = async () => {
      const _totalSupply = await apeContract.methods.tokenMinted().call();
      setTotalSupply(_totalSupply);      
    }

    if(apeContract) {
      fetchTotalSupply();
    }
  
  }, [web3.eth, apeContract, fastRefresh])


  const formatNumber = (num: any, decimalPlace: any) => {
    if (num % 1 !== 0) return num.toFixed(decimalPlace);
    return num;
  };

  const getBalanceNumber = (balance: any, decimals = 18) => {
    const displayBalance = new BigNumber(balance).dividedBy(
      new BigNumber(10).pow(decimals)
    );

    const num = displayBalance.toNumber();
    return formatNumber(num, 3);
  };

  const handleDecreaseNumber = async()=> {
    if (mintNum > 1){
      const tmp = mintNum - 1;
      setMintNum(tmp);
    }       
  }

  const handleIncreaseNumber = async()=> {
    // const publicSale = await apeContract.methods.publicSale().call()
    // var tmp = mintNum + 1;
    // if(publicSale) {
    //   if (mintNum < 10){
    //     setMintNum(tmp);
    //   }
    // } else {
    //   if (mintNum < 5){
    //     setMintNum(tmp);
    //   }          
    // }
    
    const tmp = mintNum + 1;
    if (mintNum < 10){
      setMintNum(tmp);
    }    
  }


  const handleMint = async () => {
    try {
        setRequestedMint(true)
      await mint(apeContract, account, mintNum)
    } catch (e) {
      console.log('Mint failed')      
    }
    setRequestedMint(false)
  }

  return (
    <section style={{ padding: 0, marginLeft:0}}>
      <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '5vh'}}>
        {/* **<!-- this is UNSTAKED part of Panel (LEFT)-->** */}
        <div className="pad">
          <div className={!isMobile ? "radiuspanel" : "radiuspanelmobile"} style={{ backgroundColor: "rgba(58, 68, 107, 0.5)" }}>
            <div>
              <h2 className={!isMobile ? "em-wide" : "em-wide-mobile"}>MINT YOUR NFT</h2>
            </div>
            <div className="row justify-content-center">
              <div className="text-center">
                <h5 style={{ fontSize: 10, fontFamily: 'Poppins, sans-serif', letterSpacing: '.2em' }}>
                {`TOTAL MINTED : ${totalSupply}/${maxSupply}`} <br />
                </h5>
                <h5 style={{ fontSize: 10, fontFamily: 'Poppins, sans-serif', letterSpacing: '.2em' }}>
                  MINT MAX : 10  <br />
                </h5>
              </div>
            </div>
            <div className='row centerpanel' style={{display: 'flex', justifyContent: 'center', flexWrap: "wrap", marginTop: 0}}>
              {/* Card Body */}
              <StyledLeftArrowButton onClick={handleDecreaseNumber} />
              <div className='numpanel perfect-center' style={{
                backgroundColor: 'white',
                borderRadius: 10,
                textAlign: 'center',
                fontFamily: 'Gugi',
                fontSize: 20,
                width: 50,
                marginRight: 20,
                marginLeft: 20
              }}>
                {mintNum}
              </div>
              <StyledRightArrowButton onClick={handleIncreaseNumber}/>
            </div>
            <div className="row justify-content-center">
              <div className="text-center">
                <h5 style={{ fontSize: 10, fontFamily: 'Poppins, sans-serif', letterSpacing: '.2em' }}>
                  {`TOTAL : ${(getBalanceNumber(mintprice) * mintNum).toFixed(3)}MATIC`}  <br />
                </h5>
              </div>
            </div>
            <div className="bottomButton" style={{display: 'flex', justifyContent:'center', flexWrap: "wrap", marginTop: 0 }}>
              <button type="button" className="btn" disabled={requestedMint} style={{ fontFamily: 'Gugi', letterSpacing: '0.2em' }} onClick={handleMint} >
                {requestedMint && 
                  (<FontAwesomeIcon icon={faRefresh} className="fa-spin" style={{ marginRight: "5px", fontFamily: 'Gugi', letterSpacing: '0.2em'  }} /> ) 
                }
                {requestedMint? "MINTING" : "MINT NOW"}
              </button>
            </div>       
            {chainid !== validChainid && 
              <h5 style={{textAlign: 'center', fontFamily: 'Poppins, sans-serif', letterSpacing: '.2em' }}>Test Network</h5>
            }     
          </div>
        </div>
      </div>
     
    </section>
  )
}

export default Home
