pragma solidity ^0.6.0;
import "./IExerciceSolution.sol";
import "./ERC20Claimable.sol";

contract ExerciceSolution is IExerciceSolution
{
    ERC20Claimable claimableERC20;
	mapping(address => uint256) public balance;

	constructor(ERC20Claimable _claimableERC20) public {
		claimableERC20 = _claimableERC20;
	}

	function claimTokensOnBehalf() override external {
		uint256 claimedTokens = claimableERC20.claimTokens();
		balance[msg.sender] += claimedTokens;
	}

	function tokensInCustody(address callerAddress) override external returns (uint256) {
		return balance[callerAddress];
	}

	function withdrawTokens(uint256 amountToWithdraw) override external returns (uint256) {
		balance[msg.sender] -= amountToWithdraw;
		claimableERC20.transfer(msg.sender, amountToWithdraw);
	}

	function depositTokens(uint256 amountToWithdraw) override external returns (uint256) {
        return 0;
    }

	function getERC20DepositAddress() override external returns (address) {
        address newAddress;
        return newAddress;
    }
}