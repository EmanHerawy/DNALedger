pragma solidity ^0.4.4;
contract  IdentityManager {
   struct AuthDesc {
           string name;
            bool isInit;
            bool isActive;
    }
    mapping(address => AuthDesc) Main_auth;
    mapping(uint=>bytes32)  personIDToDna;
    mapping(uint=>uint)  personIndextoId;
    mapping(bytes32=>uint)  personDnaPrintToId;
    uint public population;
     event AddAuthEvent(address delegatedFrom,address delegatedTo ,string delegatedToNAme ,string delegatedFromName);

     event FrozeAuthEvent(address delegatedFrom,address delegatedTo ,string delegatedToNAme ,string delegatedFromName);

   event UnFrozeAuthEvent(address delegatedFrom,address delegatedTo ,string delegatedToNAme ,string delegatedFromName);


    address[] public authorities;
    address public Issuer;
    modifier isissuer(){
        require(msg.sender== Issuer);
        _;
    }
        modifier isauthrized(){
        require( bytes(Main_auth[msg.sender].name).length!=0);
        _;
    }
        modifier isRegistered(uint id){
        require( personIDToDna[id]!=0);
        _;
    }
        modifier isNew(uint id){
        require( personIDToDna[id]==0);
        _;
    }
    modifier isdupplicated(address account){
        require(!Main_auth[account].isInit);
        _;
    }
    function getAuthoritiesCount() public constant returns(uint) {
    return authorities.length;
}

function getMemberData(uint index) public constant returns( string,bool, address ) {
    return (Main_auth[authorities[index]].name,Main_auth[authorities[index]].isActive, authorities[index]);
}
function getPersonDataById(uint id) public constant returns(  
        bytes32 dna) {
             
    return (personIDToDna[id]  );
}

function getPersonDataByIndex(uint index) public constant returns(
        bytes32 dna,uint Id) {
            
    return ( personIDToDna[personIndextoId[index]],personIndextoId[index]);
}
function getPersonDataByDna(bytes32 _dna) public constant returns(     uint id    

       ) {

    return (
    
    personDnaPrintToId[_dna]

    );
}

    function IdentityManager(string name) public{
    Issuer =  msg.sender;
    AuthDesc memory auth  ;
    auth.name =name;
    auth.isInit=true;
    auth.isActive=true;
    Main_auth[msg.sender]=auth;
     authorities.push(msg.sender);
   AddAuthEvent (msg.sender,msg.sender,name,name);
     }
    function addauth(address new_Auth , string name) public isissuer isdupplicated(new_Auth) returns(bool){
        AuthDesc memory auth  ;
        auth.name =name;
        auth.isInit=true;
        auth.isActive=true;

     Main_auth[new_Auth]=auth;
     authorities.push(new_Auth);
     AddAuthEvent(msg.sender,new_Auth,name,Main_auth[msg.sender].name);
return true;
     }

    function frozeauth(address new_Auth  ) public isissuer  returns(bool){
         require( Main_auth[new_Auth].isActive);
          Main_auth[new_Auth].isActive=false;
        FrozeAuthEvent(msg.sender,new_Auth, Main_auth[new_Auth].name,Main_auth[msg.sender].name);
               return  true;
          }

   function unfrozeauth(address new_Auth  ) public isissuer  returns(bool){
      require( !Main_auth[new_Auth].isActive);
         Main_auth[new_Auth].isActive=true;
       UnFrozeAuthEvent(msg.sender,new_Auth, Main_auth[new_Auth].name,Main_auth[msg.sender].name);
            return  true;
      }

     function createidentity(
         uint nationalId,
        bytes32 dna
        )public  isauthrized isNew(nationalId) returns(bool){
        personIDToDna[nationalId]=dna;
          personIndextoId[population]=nationalId;
   personDnaPrintToId[dna]=nationalId;
      population++;

        return true;
    }
    
   
    
}
