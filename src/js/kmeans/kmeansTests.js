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

    function arrayShouldContainAll(array /*expected item*/){
        var expectedItems = Array.prototype.slice.call(arguments,1);
        expectedItems.forEach(function(expectedItem){
            array.should.include.an.item.deep.equal(expectedItem);
        });
    }

    function arrayShouldContainOneOfThem(array /*expected item*/){
        var expectedItems = Array.prototype.slice.call(arguments,1);
        _.some(expectedItems,function(expectedItem){
            return !!_.find(expectedItems, function(item){
                return item == expectedItem;
            });
        }).should.be.true;
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
            nbParamsOf(window.findClosestCentroid).should.equal(2, 'The findClosestCentroid function doesn\'t contain two parameters');
        });
        it('should call distance at least one time with the first passed centroid and the second parameter', function () {
            window.findClosestCentroid([
                [5, 5]
            ], [0, 0]);
            distanceFunc.callCount.should.equal(1);
            distanceFunc.calledWith([5, 5], [0, 0]).should.true;
        });
        it('should call distance for each centroid from origin "p"', function () {
            window.findClosestCentroid([
                [1, 4],
                [3, 3],
                [5, 2]
            ], [2, 2]);
            distanceFunc.callCount.should.equal(3);
            distanceFunc.calledWith([1, 4], [2, 2]).should.true;
            distanceFunc.calledWith([3, 3], [2, 2]).should.true;
            distanceFunc.calledWith([5, 2], [2, 2]).should.true;
        });
        it('should return the index of the closest centroid', function () {
            window.findClosestCentroid([
                [1, 4],
                [3, 3],
                [5, 2]
            ], [2, 2]).should.equal(1);
        });
    });

    describe('The partitionUsingTheDistance function', function () {

        var findClosestCentroidFunc;
        beforeEach(function () {
            findClosestCentroidFunc = sinon.spy(window, "findClosestCentroid");
        });

        afterEach(function () {
            findClosestCentroidFunc.restore();
        });

        it('should exist', function () {
            expect(typeof window.partitionUsingTheDistance).equal('function', 'The partitionUsingTheDistance function doesn\'t exist');
        });
        it('should take two parameters, the first is the centroids, the second the points', function () {
            nbParamsOf(window.partitionUsingTheDistance).should.equal(2, 'The partitionUsingTheDistance function doesn\'t contain two parameters');
        });
        it('should return an object', function () {
            expect(window.partitionUsingTheDistance([], [])).to.be.an('object');
        });
        it('should group points by closest centroids index', function () {
            var centroids = [ [1, 1], [1, 4], [4, 4] ];
            var points = _.shuffle([
                [0,0],[1,0], // first partition
                [1,5],[0,4], // second partition
                [5,5],[4,5]  // third partition
            ]); // mix points

            var partitions = window.partitionUsingTheDistance(centroids, points);
            findClosestCentroidFunc.callCount.should.equal(6);
            arrayShouldContainAll(partitions[0], [0,0],[1,0]);
            arrayShouldContainAll(partitions[1], [1,5],[0,4]);
            arrayShouldContainAll(partitions[2], [5,5],[4,5]);
        });
    });

    describe ('The determineNewCentroid function', function(){
        it('should exist', function () {
            expect(typeof window.determineNewCentroid).equal('function', 'The determineNewCentroid function doesn\'t exist');
        });
        it('should take one parameter, an array of point', function () {
            nbParamsOf(window.determineNewCentroid).should.equal(1, 'The determineNewCentroid function doesn\'t contain one parameter');
        });
        it('should return a point', function () {
            expect(window.determineNewCentroid([[]]))
                .to.be.an("array")
                .and.all.be.an('array');// points
        });
        it('should return the point if its passed alone', function () {
            window.determineNewCentroid([[5,5]])
                .should.be.an('array')// a point
                .and.be.deep.equal([5,5]);
        });
        it('should return the barycenter of two points', function () {
            window.determineNewCentroid([[5,5], [0,0]])
                .should.be.an('array') // a point
                .and.deep.equal([2.5,2.5]);
        });
        it('should return the barycenter of three points', function () {
            window.determineNewCentroid([[4,4], [5,5], [0,0]])
                .should.be.an('array') // a point
                .and.be.deep.equal([3,3]);
        });
    });

    describe ('The pickStartingCentroids function', function(){
        it('should exist', function () {
            expect(typeof window.pickStartingCentroids).equal('function', 'The pickStartingCentroids function doesn\'t exist');
        });
        it('should take two parameters. The first is number of group that we want to find and the second is an array of point', function () {
            nbParamsOf(window.pickStartingCentroids).should.equal(2, 'The determineNewCentroid function doesn\'t contain two parameters');
        });
        it('should return the first point when we want find one group and we have one point', function () {
            expect(window.pickStartingCentroids(1, [[4,4]]))
                .to.be.an('array')//
                .and.all.be.an('array')// points
                .and.be.deep.equal([[4,4]]);
        });
        it('should return the three points when we want find three groups and we have three points', function () {
            var points = window.pickStartingCentroids(3, [[1,1],[2,2],[4,4]]);
            arrayShouldContainAll(points, [1,1],[2,2],[4,4]);
        });
        it('should return random points of all passed points according to nb of partition we search', function () {
            var randomPoints1 = window.pickStartingCentroids(2, [[1,1],[2,2],[4,4],[5,5]]);
            var randomPoints2 = window.pickStartingCentroids(3, [[1,1],[2,2],[4,4],[5,5]]);

            randomPoints1.should.length(2);
            arrayShouldContainOneOfThem(randomPoints1, [1,1],[2,2],[4,4],[5,5]);

            randomPoints2.should.length(3);
            arrayShouldContainOneOfThem(randomPoints2, [1,1],[2,2],[4,4],[5,5]);
            //randomPoints2.should.not.be.deep.equal(randomPoints1); Not predictive but must mostly time true
        });
    });
});