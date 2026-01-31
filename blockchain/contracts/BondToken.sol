// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title BondToken
 * @dev ERC20 token representing tokenized infrastructure bonds
 */
contract BondToken is ERC20, Ownable {
    string public bondDetails;
    uint256 public maturityDate;
    uint256 public couponRate; // in basis points (100 = 1%)
    address public issuer;
    bool public isMature;

    event BondIssued(address indexed issuer, uint256 amount, uint256 maturityDate);
    event CouponPaid(uint256 amount, uint256 timestamp);
    event BondMatured(uint256 totalAmount);

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint256 _maturityDate,
        uint256 _couponRate,
        string memory _bondDetails,
        address _issuer
    ) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply * 10 ** decimals());
        maturityDate = _maturityDate;
        couponRate = _couponRate;
        bondDetails = _bondDetails;
        issuer = _issuer;
        isMature = false;

        emit BondIssued(msg.sender, initialSupply * 10 ** decimals(), _maturityDate);
    }

    function payCoupon(uint256 amount) public onlyOwner {
        require(!isMature, "Bond has matured");
        emit CouponPaid(amount, block.timestamp);
    }

    function matureBond() public onlyOwner {
        require(block.timestamp >= maturityDate, "Bond has not matured yet");
        isMature = true;
        emit BondMatured(totalSupply());
    }

    function getDetails() public view returns (
        string memory,
        uint256,
        uint256,
        bool
    ) {
        return (bondDetails, maturityDate, couponRate, isMature);
    }
}
