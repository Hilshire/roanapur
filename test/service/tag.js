let models = require('../../src/models'),
    should = require('should');

let tagService = require('../../src/service/tag');

describe('test db', next => {
    before(() => models.sequelize.sync());

    describe('test tag', () => {
        it('should return new tag when add a tag', async () => {
            let newTag = await tagService.create('tag1');
            newTag.name.should.equal('tag1');
        })

        it('should throw an error when add a no name tag', async () => {
            tagService.create().should.be.rejectedWith(Error);
            tagService.create('').should.be.rejectedWith(Error);
        })

        it('should get the new tag list when add a list of tag', async () => {
            let newTags = await tagService.createByList([...Array(5).keys()].map(i => 'testTagList' + i));
            newTags.should.be.Array();
            newTags.length.should.equal(5);
            newTags[0].name.should.equal('testTagList0');
        })

        it('should get that tag when query a tag by id', async () => {
            let tag = await tagService.queryById(1);
            tag.name.should.equal('tag1');
        })

        it('should get new tag when query a tag by name', async () => {
            let tag = await tagService.queryByName('tag1');
            tag.id.should.equal(1);
        })

        it('should return correct result when query a tag', async () => {
            (await tagService.query(1)).name.should.equal('tag1');
            (await tagService.query('tag1')).id.should.equal(1);
        })
        
        it('should get all tag list when query all tags', async () => {
            let tagList = await tagService.queryAll();
            tagList.length.should.equal(6);
        })

        it('should success when delete', async () => {
            let beforeLength = (await tagService.queryAll()).length
            let tagId = await tagService.delete(1);
            let tags = await tagService.queryAll();
            let deletedTag = await tagService.query(1);
            tagId.should.equal(1);
            tags.length.should.equal(beforeLength - 1);
            should.not.exist(deletedTag);
        })

        it('should return a new  tag when safe query a no exist tag', async () => {
            let tag = await tagService.safeQuery('testSafeQuery');
            tag.name.should.equal('testSafeQuery');
        })

        it('should return a exist tag when safe query a exist tag', async () => {
            let tag = await tagService.safeQuery('testSafeQuery');
            tag.name.should.equal('testSafeQuery');
        })

        it('should return a tag list when safe query tag list', async () => {
            const testTagNames = ['tag1', 'testSafeQueryList'];
            const tags = await tagService.safeQueryList(testTagNames);
            tags.should.be.Array;
            tags.length.should.equal(2);
            tags[0].name.should.equal('tag1');
            tags[1].name.should.equal('testSafeQueryList');
        })

    })

    after(() => models.sequelize.dropAllSchemas())
})
