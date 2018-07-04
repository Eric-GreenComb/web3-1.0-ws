pragma solidity ^0.4.21;

contract InfoContract {
    
    string fName;
    uint age;
    uint sn = 0;
    uint channel = 0;

    event EventSetInfo(uint indexed channel, string name, uint age);

    function setChannel(uint _channel) public {
        channel = _channel;
    }    

    function getChannel() public view returns (uint) {
        return channel;
    }       
   
    function setInfo(string _fName, uint _age) public {
        fName = _fName;
        age = _age;
        sn = sn + 1;

        emit EventSetInfo(channel, _fName, _age);
    }
   
    function getInfo() public view returns (uint, string, uint) {
        return (sn, fName, age);
    }   
}