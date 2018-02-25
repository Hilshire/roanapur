const should = require('should');
const request = require('supertest');
const app = require('../../index');

describe('test control', next => {
    before(() => {})

    describe('test blog', () => {
        it('should be ok', () => {
            request(app).post('/app/v1/blogs').expect(200)
                .end((err, res) => {
                    console.log(res);
                })
        });
    });
});
