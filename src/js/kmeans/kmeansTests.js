'use strict';

mocha.setup('bdd');
mocha.reporter('html');
mocha.bail(true);
//mocha.checkLeaks();

chai.should();
var expect = chai.expect;
var assert = chai.assert;

describe('Kmeans', function () {
    function getParamsOf(func) {
        var funcStr = func.toString();
        var params = funcStr.match(/^function(?:.*?)\((.*)\)(?:.*?)\{/)[1];
        return params.replace(/ /g, '').split(',')
    }

    function nbParamsOf(func) {
        return getParamsOf(func).length;
    }


    describe("The distance function", function () {
        it('should exist', function () {
            expect(typeof window.distance).equal('function', 'The distance function doesn\'t exist');
        });
        it('should take two parameters', function () {
            nbParamsOf(window.distance).should.equal(2, 'The distance function doesn\'t contain two parameters');
        });
        it('should return 7.0710678118654755 when we pass [0,0] and [5,5]', function () {
            window.distance([0, 0], [5, 5]).should.equal(7.0710678118654755);
        });
        it('should return 7.0710678118654755 when we pass [5,3] and [7,2]', function () {
            window.distance([5, 3], [7, 2]).should.equal(2.23606797749979);
        });
    });

    describe("The findClosestCentroid function", function () {

        beforeEach(function () {
            sinon.spy(window, "distance");
        });

        afterEach(function () {
            window.distance.restore();
        });

        it('should exist', function () {
            expect(typeof window.findClosestCentroid).equal('function', 'The findClosestCentroid function doesn\'t exist');
        });
        it('should take two parameters', function () {
            nbParamsOf(window.findClosestCentroid).should.equal(2, 'The distance function doesn\'t contain two parameters');
        });
        xit('should call one time distance with the first passed centroid and the second parameter', function () {
            window.findClosestCentroid([[5,5],[1,1]], [0,0]);
            window.distance.calledCount.should.be.least(1);
            window.distance.calledWith([5,5], [0,0]);
        });
    });
});


mocha.run();