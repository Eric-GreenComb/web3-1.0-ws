pragma solidity ^0.4.21;

contract InfoContract {
    
    string fName;
    uint age;
    uint sn = 0;

    event EventSetInfo(uint indexed channel, string name, uint age);
   
    function setInfo(string _fName, uint _age) public {
        fName = _fName;
        age = _age;
        sn = sn + 1;

        emit EventSetInfo(20180704, _fName, _age);
    }
   
    function getInfo() public view returns (uint, string, uint) {
        return (sn, fName, age);
    }   
}