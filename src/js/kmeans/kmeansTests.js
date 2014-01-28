'use strict';

mocha.setup('bdd');
mocha.reporter('html');
mocha.bail(true);
//mocha.checkLeaks();

chai.should();
var expect = chai.expect;
var assert = chai.assert;


describe ("The distance function", function(){
    it('should exist', function () {
        expect(typeof distance).equal('function', 'The distance function doesn\'t exist');
    });
    it('should take two parameters', function () {
        var func = distance.toString();
        var params = func.match(/^function(?:.*?)\((.*)\)(?:.*?)\{/)[1];
        params.replace(/ /g, '').split(',').length.should.equal(2, 'The distance function doesn\'t contain two parameters');
    });
    it('should return 7.0710678118654755 when we pass [0,0] and [5,5]', function () {
        distance([0,0],[5,5]).should.equal(7.0710678118654755);
    });
    it('should return 7.0710678118654755 when we pass [5,3] and [7,2]', function () {
        distance([5,3],[7,2]).should.equal(2.23606797749979);
    });
});

mocha.run();