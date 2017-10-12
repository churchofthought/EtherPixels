pragma solidity ^0.4;
contract MillionPixelPage {
    address owner = msg.sender;
    uint pricePerPixel = 1 finney; // 0.001 ether
    uint32[1024][1024] internal pixels;
    
    modifier onlyOwner {
        if (msg.sender == owner){
            _;
        }    
    }

    function setPixel(uint16 x, uint16 y, uint32 color) public payable {
        // make sure payment is enough
        require(msg.value >= pricePerPixel);
        
        // make sure coordinates are within grid
        require (x < 1024 && y < 1024);
        
        // set pixel to grid
        pixels[x][y] = color;
    }
    
    function setPixels(bytes changes) public payable {
        uint numChanges = changes.length / 8;
        
        // make sure payment is enough
        require(msg.value >= numChanges * pricePerPixel);
        
        // iterate through pixel changes
        for (uint i = 0; i < numChanges; ++i){
            uint base = 8 * i;
            uint x = uint(changes[base + 1]) << 8 | uint(changes[base]);
            uint y = uint(changes[base + 3]) << 8 | uint(changes[base + 2]);
            
            // make sure coordinates are within grid
            if (x >= 1024 || y >= 1024) continue;
            
            uint32 color = uint32(changes[base + 7]) << 24 | uint32(changes[base + 6]) << 16 | uint32(changes[base + 5]) << 8 | uint32(changes[base + 4]);
            
            // set pixel to grid
            pixels[x][y] = color;
        }
    }
    
    function setPricing(uint256 price) onlyOwner public {
        pricePerPixel = price;
    }
    
    function withdraw() public {
        owner.transfer(this.balance);
    }
}