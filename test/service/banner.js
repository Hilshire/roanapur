let models = require('../../src/models'),
    should = require('should')

let bannerService = require("../../src/service/banner")

describe('test service', next => {
    before(() => models.sequelize.sync())

    describe('test banner', () => {
        it('should not success when create a banner without content', async () => {
            bannerService.create({}).should.rejectedWith(Error);
            bannerService.create().should.rejectedWith(Error);
        });
        it('should success and return new banner', async () => {
            let banner = await bannerService.create({ content : 'banner1' })
            banner.id.should.equal(1)
        });
        it('should return correct banner list when query banner list', async () => {
            for (let i=0; i<10; i++)
                await bannerService.create({title: 'fill', content: 'fill'})

            let bannerList = await bannerService.queryList(2)
            bannerList.length.should.equal(1)
            bannerList[0].id.should.equal(1)
            bannerList[0].content.should.deepEqual('banner1')

            let bannerList2 = await bannerService.queryList(1, 10)
            bannerList2.length.should.equal(10)
            bannerList2[0].id.should.equal(11)
        })
        it('should success when delete a banner', async () => {
            let bannerId = await bannerService.delete(1)
            let banners = await bannerService.queryList(2, 10)
            bannerId.should.equal(1)
            banners.length.should.equal(0)
        })
        it('should success when update a banner', async () => {
            await bannerService.update(11, { content: 'update banner' })
            let banners = await bannerService.queryList(1, 10)
            banners[0].content.should.equal('update banner')
        })
    })

    after(() => models.sequelize.dropAllSchemas())
})
