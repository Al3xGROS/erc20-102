var TDErc20 = artifacts.require("ERC20TD.sol");
var ERC20Claimable = artifacts.require("ERC20Claimable.sol");
var evaluator = artifacts.require("Evaluator.sol");
var solution = artifacts.require("ExerciceSolution.sol");


module.exports = (deployer, network, accounts) => {
    deployer.then(async () => {
        // await deployTDToken(deployer, network, accounts); 
        // await deployEvaluator(deployer, network, accounts); 
        // await setPermissionsAndRandomValues(deployer, network, accounts); 
        await setStaticContracts(deployer, network, accounts); 
        await deployRecap(deployer, network, accounts); 
        await testSolution(deployer, network, accounts);
    });
};

// async function deployTDToken(deployer, network, accounts) {
// 	TDToken = await TDErc20.new("TD-ERC20-102-23","TD-ERC20-102-23",web3.utils.toBN("20000000000000000000000000000"))
// 	ClaimableToken = await ERC20Claimable.new("ClaimableToken23","CLTK-23",web3.utils.toBN("20000000000000000000000000000"))
// }

// async function deployEvaluator(deployer, network, accounts) {
// 	Evaluator = await evaluator.new(TDToken.address, ClaimableToken.address)
// }

// async function setPermissionsAndRandomValues(deployer, network, accounts) {
// 	await TDToken.setTeacher(Evaluator.address, true)
// }

async function setStaticContracts(deployer, network, accounts) {
	TDToken = await TDErc20.at("0xb79a94500EE323f15d76fF963CcE27cA3C9e32DF")
	ClaimableToken = await ERC20Claimable.at("0xE70AE39bDaB3c3Df5225E03032D31301E2E71B6b")
	Evaluator = await evaluator.at("0x16F3F705825294A55d40D3D34BAF9F91722d6143")
}

async function deployRecap(deployer, network, accounts) {
	console.log("TDToken " + TDToken.address)
	console.log("ClaimableToken " + ClaimableToken.address)
	console.log("Evaluator " + Evaluator.address)
}

async function testSolution(deployer, network, accounts) {
	mySolution = await solution.new(ClaimableToken.address)
	console.log("ContractAddress " + mySolution.address)
    console.log("MyAccount " + accounts[0])
	await Evaluator.submitExercice(mySolution.address)
	console.log("Exercice submitted!")
	// await Evaluator.ex2_claimedFromContract()
	// console.log("Ex2 done!")
	// await Evaluator.ex3_withdrawFromContract()
	// console.log("Ex3 done!")
	// await ClaimableToken.increaseAllowance(mySolution.address, 1)
	// await Evaluator.ex4_approvedExerciceSolution()
	// console.log("Ex4 done!")
	// await ClaimableToken.decreaseAllowance(mySolution.address, 1)
	// await Evaluator.ex5_revokedExerciceSolution()
	// console.log("Ex5 done!")
	await Evaluator.ex6_depositTokens()
	console.log("Ex6 done!")
	myBalance = await TDToken.balanceOf(accounts[0])
	console.log("BalanceTokens " + myBalance/1000000000000000000)
	console.log()
}