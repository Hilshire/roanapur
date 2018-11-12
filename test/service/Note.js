let models = require('../../src/models'),
    should = require('should')

let noteService = require('../../src/service/note')

describe('test service', next => {
    before(() => models.sequelize.sync())

    describe('test note', () => {
        it('should success when add a note', async () => {
            const note = await noteService.create({
                title: 'test',
                content: 'test note'
            }, ['tag1', 'tag2']);
            note.id.should.equal(1);
        })

        it('should also sucess when add a note without tag info', async () => {
            const note = await noteService.create({
                title: 'test2',
                content: 'test note 2'
            });
            note.id.should.equal(2);
        })

        it('should not sucess when add a note without title or content', async () => {
            await noteService.create({ content: 'test3 without title' }).should.be.rejectedWith(Error);
            await noteService.create({ title: 'test4 without content' }).should.be.rejectedWith(Error);
        })

        it('should success when query a note', async () => {
            let data = await noteService.query(1);
            data.id.should.equal(1);
            data.title.should.equal('test');
            data.content.should.deepEqual(Buffer.from('test note'));
        })

        it('should return corrent data when query note list', async () => {
            for (let i=0; i<5; i++)
                noteService.create({title: 'fill', content: 'fill'});

            let noteList = await noteService.queryList(2, 5);
            noteList.should.have.length(2);
            noteList[1].id.should.equal(1);
            noteList[1].content.should.deepEqual(Buffer.from('test note'));

            let noteList2 = await noteService.queryList(1, 5);
            noteList2.should.have.length(5);
        })

        it ('should success when add tags', async () => {
            await noteService.addTag(1, 'tag3');
            await noteService.addTags(1, ['tag4', 'tag5']);
            let tags = await noteService.queryTags(1);;
            tags.should.have.length(5);
            tags[2].name.should.equal('tag3');
            tags[4].name.should.equal('tag5');
        })

        it('should success when del tags', async () => {
            await noteService.deleteTag(1, 1);
            let tags = await noteService.queryTags(1);
            tags.length.should.equal(4);
            // TODO: fix it: this will change when another test crate a new tag;
            tags[0].id.should.equal(2);

            await noteService.deleteAllTags(1);
            let note2 = await noteService.query(1);
            let tags2 = await noteService.queryTags(1);
            tags2.should.not.exist;
        })

        it('should success when update', async () => {
            await noteService.update(1, {
                title: 'title update',
            })
            let note = await noteService.query(1)
            note.title.should.equal('title update')
            note.content.should.deepEqual(Buffer.from('test note'))
        })

        it('should success when delete', async () => {
            let noteId = await noteService.delete(1)
            let notes = await noteService.queryList(1, 10)
            let deletedNote = await noteService.query(1)
            noteId.should.equal(1)
            notes.length.should.equal(6)
            should.not.exist(deletedNote)
        })

    })

    after(() => models.sequelize.dropAllSchemas())
})
