const should = require('should');
const request = require('supertest');
const app = require('../../index');
const models = require('../../src/models');

const blogService = require('../../src/service/Blog');

describe('test control', next => {
    before(() => models.sequelize.sync())

    describe('test blog', async () => {
        let id, tagId;
        const title = 'test blog',
              content = 'test blog content',
              modifyTitle = 'modify title',
              modifyContent = 'modify content',
              tagName = 'tag';

        it('get a new blog', done => {
            request(app).post('/app/v1/blogs')
                .send({ title, content })
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.id.should.exist;
                    id = res.body.id;
                    res.body.title.should.equal(title);
                    res.body.content.should.equal(content);
                    done();
                });
        })
        it('get all blogs', done => {
           request(app).get('/app/v1/blogs')
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.should.be.Array();
                    res.body[0].title.should.equal(title);
                    done();
                });
        });
        it('get queried blog', done => {
            request(app).get(`/app/v1/blogs/${id}`)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.id.should.equal(id);
                    done();
                })
        });
        it('change the blog', done => {
            request(app).put(`/app/v1/blogs/${id}`)
                .send({ title: modifyTitle, content: modifyContent })
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.title.should.equal(modifyTitle);
                    res.body.content.should.equal(modifyContent);
                    done()
                });
        })
        it('add tag', done => {
            request(app).post(`/app/v1/blogs/${id}/tags`)
                .send({ name: tagName })
                .end(async (err, res) => {
                    res.status.should.equal(200);
                    tagId = res.body[0][0].tag_id;
                    (await blogService.queryTags(id)).map(i => i.name).should.containEql(tagName);
                    done();
                })
        });
        // it('query all tags', done => {
            // request(app).post()
        // })
        it('delete the tag', done => {
            request(app).delete(`/app/v1/blogs/${id}/${tagId}`)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.should.equal(tagId);
                    done();
                })
        });
        it('delete the blog', done => {
            request(app).delete(`/app/v1/blogs/${id}`)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.should.equal(id);
                    done()
                })
        });
    });
});
