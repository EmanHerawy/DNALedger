pragma solidity ^0.4.4;
contract  IdentityManager {
   struct AuthDesc {
           string name;
            bool isInit;
            bool isActive;
    }
        enum PersonStatus{
     Alive,Lost ,Died
    }
        struct PersonInfo {
     
        string name;
        bytes32 datapath;
        bytes32 fingerPrint;
        // need to rethink about it
        bytes32 dna;
         uint fatherId;
         uint motherId;
         PersonStatus _status;
    }
    mapping(address => AuthDesc) Main_auth;
    mapping(uint=>PersonInfo)  people;
    // mapping(string=>uint)  personNametoId;
    mapping(uint=>uint)  personIndextoId;
    mapping(bytes32=>uint)  personfingerPrintToId;
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
        require( bytes(people[id].name).length!=0);
        _;
    }
        modifier isNew(uint id){
        require( bytes(people[id].name).length==0);
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
function getPersonDataById(uint id) public constant returns(     string name,
        bytes32 datapath,
        bytes32 fingerPrint,
        // need to rethink about it
        bytes32 dna,
         uint fatherId, 
         uint motherId,
         PersonStatus _status) {
             
    return (people[id].name,people[id].datapath,people[id].fingerPrint,people[id].dna,
    people[id].fatherId,people[id].motherId,people[id]._status);
}
// function getPersonDataByName(string name) public constant returns(     string name,
//         bytes32 datapath,
//         bytes32 fingerPrint,
//         // need to rethink about it
//         bytes32 dna,
//          uint fatherId,
//          uint motherId,
//          PersonStatus _status) {
//            uint  id = personNametoId[_name] ;
//     return (people[id].name,people[id].datapath,people[id].fingerPrint,people[id].dna,
//     people[id].fatherId,people[id].motherId,people[id]._status);
// }
function getPersonDataByIndex(uint index) public constant returns(     string name,
        bytes32 datapath,
        bytes32 fingerPrint,
        // need to rethink about it
        bytes32 dna,
         uint fatherId,
         uint motherId,
         PersonStatus _status) {
        //    uint  id = personNametoId[_name] ;
           uint  id = personIndextoId[index] ;
    return (people[id].name,people[id].datapath,people[id].fingerPrint,people[id].dna,
    people[id].fatherId,people[id].motherId,people[id]._status);
}
function getPersonDataByDna(bytes32 _dna) public constant returns(     string name,
        bytes32 datapath,
        bytes32 fingerPrint,
        // need to rethink about it
        bytes32 dna,
         uint fatherId,
         uint motherId,
         PersonStatus _status) {
                        uint  id = personDnaPrintToId[_dna] ;

    return (people[id].name,people[id].datapath,people[id].fingerPrint,people[id].dna,
    people[id].fatherId,people[id].motherId,people[id]._status);
}
function getPersonDataByFingerPrint(bytes32 _fingerPrint) public constant returns(     string name,
        bytes32 datapath,
        bytes32 fingerPrint,
        // need to rethink about it
        bytes32 dna,
         uint fatherId,
         uint motherId,
         PersonStatus _status) {
                                     uint  id = personfingerPrintToId[_fingerPrint] ;

    return (people[id].name,people[id].datapath,people[id].fingerPrint,people[id].dna,
    people[id].fatherId,people[id].motherId,people[id]._status);
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
return true;
          }

   function unfrozeauth(address new_Auth  ) public isissuer  returns(bool){
      require( !Main_auth[new_Auth].isActive);
         Main_auth[new_Auth].isActive=true;
       UnFrozeAuthEvent(msg.sender,new_Auth, Main_auth[new_Auth].name,Main_auth[msg.sender].name);
return true;
      }

     function createidentity(
   uint nationalId,string name,
         bytes32 datapath,
        bytes32 fingerPrint,
        // need to rethink about it
        bytes32 dna,
     uint fatherId,
    uint motherId
    )public  isauthrized isNew(nationalId) returns(bool){
          PersonInfo memory   _data;
        _data.name=name;
        _data._status=PersonStatus.Alive;
        _data.dna=dna;
        _data.datapath=datapath;
        _data.fingerPrint=fingerPrint;
        _data.fatherId=fatherId;
        _data.motherId=motherId;
        people[nationalId]=_data;
        
//   personNametoId[name]=nationalId;
  personIndextoId[population]=nationalId;
    personfingerPrintToId[fingerPrint]=nationalId;
   personDnaPrintToId[dna]=nationalId;
      population++;

        return true;
    }
    
       function changestatus(PersonStatus _status,uint _id)public isRegistered(_id) isauthrized{
           people[_id]._status=_status;
    
    }
    
}
