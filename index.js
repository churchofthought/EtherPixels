const contractAddr = "0x18e1438312262214db7ad40def5542f9e783560a";
const cvs = document.getElementById("cvs");
const ctx = cvs.getContext("2d");

const numThreads = 4;

var i = -1;
setTimeout(() => {
	while (numThreads--){
		var thread = {i: i};
		thread.cb = cb.bind(thread);
		thread.cb();
	}
}, 1000);


const unpair = (z) => {
	const w = Math.ceil(
		(Math.sqrt(8 * z + 1) - 1) / 2
	);
	const t = w * (w + 1) / 2;
	const y = z - t;
	const x = w - y;

	return [x,y];
};

const pair = (x,y) => (
	(x + y + 1) * (x + y) / 2 + y
);

function cb(err, val){
	if (val){
		val
			.slice(2)
			.split("")
			.map(v => ("000" + parseInt(v,16).toString(2)).slice(-4))
			.join("");
			.forEach((v, idx) => {
				const coords = unpair(this.i + idx);
				ctx.fillStyle = v == "0" ? "#000" : "#fff";
				ctx.fillRect(coords[0], coords[1], 1, 1);
			});
	}
	if ((++i) == 4096){
		return;
	}
	thread.i = i;
	web3.eth.getStorageAt(contractAddr, i, this.cb);
}