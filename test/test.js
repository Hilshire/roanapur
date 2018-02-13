let should = require('should')

function test() {
    return 1
}

describe('test test', () => {
    it('should return 1', done => {
        should.equal(test(), 1)
        done()
    })
})
