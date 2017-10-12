const contractAddr = "0x18e1438312262214db7ad40def5542f9e783560a";
const cvs = document.getElementById("cvs");
const ctx = cvs.getContext("2d");

setTimeout(function(){
	for (var x = 250; x < 260; ++x){
		for (var y = 127; y < 128; ++y){
			((x,y) => web3.eth.getStorageAt(contractAddr, 128 * x + y + 2, (err, color) => {
				for (var i = 1; i <= 8; ++i){
					ctx.fillStyle = "#" + color.slice(2, 2 + 8*i);
					ctx.fillRect(x, y + 8 - i, 1, 1);
				}
			}))(x,y);
		}
	}
}, 1000);