var  assert = require('assert'), encoding = require('./../src/encoding');

describe('#Base64', function() {
    describe('#encode', function() {
        it('should return encoded value when normal string is passed', function() {
            var response = encoding.Base64.encode("test");
            assert.equal(response, 'dGVzdA==');
        });

        it('should return encoded value when string with special chars is passed', function() {
            var response = encoding.Base64.encode("test1Ä");
            assert.equal(response, 'dGVzdDHDhA==');
        });
    });

});
