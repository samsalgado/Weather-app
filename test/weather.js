const {expect} = require('chai');
describe('weather contract', () => {
    let Weather, admin, dao, addr1, addr2;
    beforeEach(async () => {
        Weather = await ethers.getContractFactory('Weather');
        weather = await Weather.deploy();
        [dao,admin, addr1, addr2, _] = await ethers.getSigners();
    });
    describe('Deployment', () => {
        it('should set admin', async () => {
            expect(await weather.admin()).lessThanOrEqual(admin.address);
        });
        it('should add donation', async() => {
            expect(await weather.donate({from: addr1, value: 32}));
            expect(await weather.donate({from: addr2, value:42}));
            const funds1 = await weather.funds(addr1);
            const funds2 = await weather.funds(addr2);
            expect(funds1.toNumber() === 32);
            expect(funds2.toNumber() === 42);
        });
    });
});
