let models = require('../../src/models'),
    should = require('should')

let blogService = require('../../src/service/blog')

describe('test service', next => {
    before(() => models.sequelize.sync()) 

    describe('test blog', () => {
        it('should success and return blog id when add a blog', async () => {
            let blog = await blogService.create({
                title: 'test',
                content: 'test blog',
                summary: 'no summary'
            }, ['tag1', 'tag2'])
            blog.id.should.equal(1)
        })

        it('should also success when add a blog without tag info', async () => {
            let blog = await blogService.create({
                title: 'test2',
                content: 'test blog 2'
            })
            blog.id.should.equal(2)
        })

        it('should throw when add a blog without title or content', async () => {
            await blogService.create({ content: 'test3 without title' }).should.be.rejectedWith(Error);
            await blogService.create({ title: 'test4 without content' }).should.be.rejectedWith(Error);
        })

        it('should success when query a blog', async () => {
            let data = await blogService.query(1)
            data.id.should.equal(1)
            data.title.should.equal('test')
            data.content.should.deepEqual(Buffer.from('test blog'))
            data.summary.should.deepEqual(Buffer.from('no summary'))
        })

        it('should return correct data when query blog list', async () => {
            for (let i=0; i<5; i++)
                blogService.create({title: 'full', content: 'full'})

            let blogList = await blogService.queryList(2, 5)
            blogList.should.have.length(2)
            blogList[1].id.should.equal(1)

            let blogList2 = await blogService.queryList(1, 5)
            blogList2.should.have.length(5)
        })

        it ('should success when add tags', async () => {
            let result1 = await blogService.addTag(1, 'tag3')
            let result2 = await blogService.addTags(1, ['tag4', 'tag5'])
            let tags = await blogService.queryTags(1)
            tags.should.have.length(5)
            tags[2].name.should.equal('tag3')
            tags[4].name.should.equal('tag5')
        })

        it('should success when del tags', async () => {
            await blogService.deleteTag(1, 1)
            let tags = await blogService.queryTags(1)
            tags.length.should.equal(4)
            tags[0].id.should.equal(2)

            await blogService.deleteAllTags(1)
            let blog2 = await blogService.query(1)
            let tags2 = await blogService.queryTags(1)
            tags2.should.not.exist
        })

        it('should success when update', async () => {
            await blogService.update(1, {
                title: 'title update',
            })
            let blog = await blogService.query(1)
            blog.title.should.equal('title update')
            blog.content.should.deepEqual(Buffer.from('test blog'))
        })

        it('should success when delete', async () => {
            let blogId = await blogService.delete(1)
            let blogs = await blogService.queryList(1, 10)
            let deletedBlog = await blogService.query(1)
            blogId.should.equal(1)
            blogs.length.should.equal(6)
            should.not.exist(deletedBlog)
        })

    })

    after(() => models.sequelize.dropAllSchemas())
})
