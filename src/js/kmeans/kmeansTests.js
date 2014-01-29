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
        return func.length;
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
        it('should return 2.23606797749979 when we pass [5,3] and [7,2]', function () {
            window.distance([5, 3], [7, 2]).should.equal(2.23606797749979);
        });
    });

    describe("The findClosestCentroid function", function () {

        var distanceFunc;
        beforeEach(function () {
            distanceFunc = sinon.spy(window, "distance");
        });

        afterEach(function () {
            distanceFunc.restore();
        });

        it('should exist', function () {
            expect(typeof window.findClosestCentroid).equal('function', 'The findClosestCentroid function doesn\'t exist');
        });
        it('should take two parameters', function () {
            nbParamsOf(window.findClosestCentroid).should.equal(2, 'The distance function doesn\'t contain two parameters');
        });
        it('should call distance at least one time with the first passed centroid and the second parameter', function () {
            window.findClosestCentroid([[5,5]], [0,0]);
            distanceFunc.callCount.should.equal(1);
            distanceFunc.calledWith([5,5], [0,0]).should.true;
        });
        it('should call distance for each centroid form origin "p"', function () {
            window.findClosestCentroid([[1,4],[3,3],[5,2]], [2,2]);
            distanceFunc.callCount.should.equal(3);
            distanceFunc.calledWith([1,4], [2,2]).should.true;
            distanceFunc.calledWith([3,3], [2,2]).should.true;
            distanceFunc.calledWith([5,2], [2,2]).should.true;
        });
        it('should return the index of the closest centroid', function () {
            window.findClosestCentroid([[1,4],[3,3],[5,2]], [2,2]).should.equal(1);
        });
    });
});