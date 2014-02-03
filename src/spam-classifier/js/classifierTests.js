'use strict';

mocha.setup('bdd');
mocha.reporter('html');
mocha.bail(true);
//mocha.checkLeaks();

chai.should();
var expect = chai.expect;
var assert = chai.assert;

describe('Naive Bayes spam classifier', function () {

    function nbParamsOf(func) {
        return func.length;
    }


    describe("The SpamClassifier", function () {
        it('should exist', function () {
            expect(typeof window.SpamClassifier).equal('function', 'The spam classifier function should exist');
        });
        it('should create be instantiable', function () {
            var classifier = new SpamClassifier();
            expect(classifier).to.be.instanceof(SpamClassifier, 'The spam classifier should be used in order to instantiate an object');
        });
        it('should have a train method', function () {
            var classifier = new SpamClassifier();
            expect(classifier.train).to.be.instanceof(Function, "Train should be a function");
        });
        it('train method should have one parameter', function () {
            var classifier = new SpamClassifier();
            nbParamsOf(classifier.train).should.equal(1, "The train method should have one parameter");
        });
        it('should have an isSpam method', function () {
            var classifier = new SpamClassifier();
            expect(classifier.isSpam).to.be.instanceof(Function, "isSpam should be a function");
        });
    });

});

