const models = require('../../src/models'),
    should = require('should');

const aboutService = require('../../src/service/about');

describe('test service', next => {
    before(() => models.sequelize.sync());

    describe('test about', async () => {
        it('should success when add a about', async () => {
            await aboutService.create({ content: 'about me' });
            let about = await aboutService.query(1);
            about.content.should.deepEqual(Buffer.from('about me'));
        });
        it('should return the newest about', async () => {
            await aboutService.create({ content: 'about 2' });

            let about = (await aboutService.query());
            about.id.should.equal(2);
        })
    });

    after(() => models.sequelize.dropAllSchemas());
})