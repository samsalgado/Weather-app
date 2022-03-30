//const fs = require('fs');
async function main() {
    const [deployer] = await ethers.getSigners();
    console.log(`Deploying contract address: ${deployer.address}`);
}

/*const data = {
    address: weather.address,
    abi: JSON.parse(weather.interface.format('json'))
};
fs.writeFileSync('frontend/src/Weather.json', JSON.stringify(data));
*/
main().then(() => process.exit(0))
.catch(error => {console.error(error);
    process.exit(1)});
