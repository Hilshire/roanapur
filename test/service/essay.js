let models = require('../../src/models'),
    should = require('should');

let essayService = require('../../src/service/essay');

describe('test db', next => {
    before(() => models.sequelize.sync());

    describe('test essay', () => {
        it('should success and return new essay when add a essay', async () => {
            let newEssay = await essayService.create({
                title: 'test',
                content: 'test essay'
            }, ['tag1', 'tag2']);
            newEssay.id.should.equal(1)
        })

        it('should also sucess when add a essay without tag info', async () => {
            let newEssay = await essayService.create({
                title: 'test2',
                content: 'test essay 2'
            })
            newEssay.id.should.equal(2)
        })

        it('should not sucess when add a essay without title or content', async () => {
            let error1 = await essayService.create({
                content: 'test3 without title'
            })
            let error2 = await essayService.create({
                title: 'test4 without content'
            })
            error1.errorCode.should.equal(1)
            error2.errorCode.should.equal(1)
            essayService.query(3).should.not.exist
        })

        it('should success when query a essay', async () => {
            let data = await essayService.query(1)
            data.id.should.equal(1)
            data.title.should.equal('test')
            data.content.should.deepEqual(Buffer.from('test essay'))
        })

        it('should return corrent data when query essay list', async () => {
            for (let i=0; i<5; i++)
                essayService.create({title: 'full', content: 'full'})

            let essayList = await essayService.queryList(2, 5)
            essayList.should.have.length(2)
            essayList[1].id.should.equal(1)

            let essayList2 = await essayService.queryList(1, 5)
            essayList2.should.have.length(5)
        })

        it ('should success when add tags', async () => {
            await essayService.addTag(1, 'tag3')
            await essayService.addTags(1, ['tag4', 'tag5'])
            let tags = await essayService.queryTags(1)
            // tags.should.have.length(4) // TODO: this will cause a endless loop, so why?
            tags.length.should.equal(5)
            tags[2].text.should.equal('tag3')
            tags[4].text.should.equal('tag5')
        })

        it('should success when del tags', async () => {
            await essayService.deleteTag(1, 1)
            let tags = await essayService.queryTags(1)
            tags.length.should.equal(4)
            tags[0].id.should.equal(2)

            await essayService.deleteAllTags(1)
            let essay2 = await essayService.query(1)
            let tags2 = await essayService.queryTags(1)
            tags2.should.not.exist
        })

        it('should success when update', async () => {
            await essayService.update(1, {
                title: 'title update',
            })
            let essay = await essayService.query(1)
            essay.title.should.equal('title update')
            essay.content.should.deepEqual(Buffer.from('test essay'))
        })

        it('should success when delete', async () => {
            let essayId = await essayService.delete(1)
            let essays = await essayService.queryList(1, 10)
            let deletedEssay = await essayService.query(1)
            essayId.should.equal(1)
            essays.length.should.equal(6)
            should.not.exist(deletedEssay)
        })

    })

    after(() => models.sequelize.dropAllSchemas())
})
