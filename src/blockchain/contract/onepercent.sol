// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FourIntHoldersInu is ERC20, ERC20Burnable, Ownable {
    
    address private constant _owner = 0x22C0dFc93Da66a8a944641c41eAe26F4f2A74333;

    address private _smartContract;

    mapping(address => bool) private _hasClaimed;

    constructor() ERC20("4intHoldersInu", "4HI") Ownable(_owner) {
        _mint(_owner, 500_000_000 * 10**18); 
        _smartContract = address(this);
        _mint(_smartContract, 500_000_000 * 10**18); 
    }

    function getTotalSupply() external view returns (uint256) {
        return totalSupply();
    }

    function burnTokens(uint256 amount) external onlyOwner {
        _burn(msg.sender, amount);
    }

    function claim() external {
        require(!_hasClaimed[msg.sender], "Account has already claimed");
        require(balanceOf(_smartContract) >= 100_000 * 10**18, "Insufficient balance in the smart contract");

        _hasClaimed[msg.sender] = true;
        _transfer(_smartContract, msg.sender, 100_000 * 10**18);
    }
}
