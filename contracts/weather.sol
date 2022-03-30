pragma solidity 0.8.13;
import "../contracts/Library.sol";
import 'hardhat/console.sol';
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
contract Weather is Library {
    using SafeMathUpgradeable for uint256;
    address public admin;
    struct  fundWeatherChannel{
        uint256 id;
        string name;
        uint256 amount;
        address payable recipient; 
    }
    modifier onlyAdmin() {
        require(msg.sender == admin);
        _;
    }
    mapping(uint256 => fundWeatherChannel) public donations;
    mapping(uint256 => uint256) public funds;
    mapping(address => uint256) balances;
    uint256 public totalFunds;
    uint256 public availableFunds;
    function donate() payable public {
        balances[msg.sender].add(msg.value);
    }
    function getFunds() public view returns(uint) {
        console.log('balance is %s', address(this).balance);
        return address(this).balance;
    }
    function withdrawEther(uint256 amount, address payable to) external onlyAdmin {
        console.log('withdrawing %s', admin);
        _transferEther(amount, to);
    }
    function _transferEther(uint256 amount, address payable to) internal {
        require(amount <= availableFunds, "INSUFFICIENT FUNDS");
        console.log('Transferring %s', amount);
        availableFunds -= amount;
        to.transfer(amount);
    }
}