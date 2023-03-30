import BigNumber from "bignumber.js";
import { formatUnits } from 'ethers/lib/utils'
import { ethers } from 'ethers'

export const formatNumber = (num: any, decimalPlace: any) => {
  if (num % 1 !== 0) return num.toFixed(decimalPlace);
  return num;
};

export const getBalanceNumber = (balance: any, decimals = 18) => {
  const displayBalance = new BigNumber(balance).dividedBy(
    new BigNumber(10).pow(decimals)
  );

  const num = displayBalance.toNumber();
  return formatNumber(num, 3);
};

export const getFullDisplayBalance = (balance: any, decimals = 18) => {
  return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed();
};

/**
 * Method to format the display of wei given an ethers.BigNumber object
 * Note: does NOT round
 */
 export const formatBigNumber = (number: ethers.BigNumber, displayDecimals = 18, decimals = 18) => {
  const remainder = number.mod(ethers.BigNumber.from(10).pow(decimals - displayDecimals))
  return formatUnits(number.sub(remainder), decimals)
}
