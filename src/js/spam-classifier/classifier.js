var fs = require('fs'),
	_ = require('lodash');

function SpamClassifier(unknownWordProbability) {
	this._unknownWordProbability = unknownWordProbability || 0.0001;
}

SpamClassifier.prototype = {
	train : function(trainingSet) {
		this.numTrainingMsg = countKeys(trainingSet);
		this.num = {};
		this.num['ham'] = trainingSet.filter(function(v) {
			return v.type == 'ham';
		}).length;
		this.num['spam'] = this.numTrainingMsg - this.num['ham'];

		this.frequencies = trainingSet.reduce(function(acc, item) {
			for (var word in item.content) {
				if (acc[item.type][word]) {
					acc[item.type][word] += 1;
				} else {
					acc[item.type][word] = 1;
				}
			}
			return acc;
		}, {ham : {}, spam : {}});
	},
	pWord : function(word, msgType) {
		if (!this.frequencies[msgType][word]) {
			return this._unknownWordProbability;
		}

		return this.frequencies[msgType][word] / this.num[msgType];
	},
	pType : function(type) {
		return this.num[type] / this.numTrainingMsg;
	},
	p : function(msg, type) {
		var bagOfWords = fromTextToBagOfWords(removePunctuationFromText(msg)),
			proba = 1;
		
		for (var word in bagOfWords) {
			proba = this.pWord(word, type) * proba;
		}

		return proba * this.pType(type);
	},
	isSpam : function(msg) {
		return (this.p(msg, 'spam') / this.p(msg, 'ham')) > 1;
	}
};

function countKeys(obj) {
	return Object.keys(obj).length;
}

function fromRawToStructured(data) {
	var lines = data.split('\n');

	return lines.map(function(line) {
		var type, contentOffset;

		if (line.substring(0, 3) == 'ham') {
			type = 'ham';
			contentOffset = 5;
		} else {
			type = 'spam';
			contentOffset = 6;
		}

		return {
			type : type,
			content : line.substring(contentOffset)
		};
	}).filter(function(line) {
		return line.content.length > 0;
	});
}

function removePunctuation(structuredData) {
	return structuredData.map(function(item) {
		return {
			type : item.type,
			content : removePunctuationFromText(item.content)
		}
	});
}

function removePunctuationFromText(content) {
	return content
		.replace(/&lt;/, '<')
		.replace(/&gt;/, '>')
		.replace(/&amp;/, '&')
		.replace(/[^\w]/g, " ")
		.toLowerCase();
}

function bagOfWords(text) {
	return text.map(function(item) {
		return {
			type : item.type,
			content : fromTextToBagOfWords(item.content)
		}
	});
}

function fromTextToBagOfWords(text) {
	return _(text.split(' '))
		.filter(function(token) {
			return token.length > 0;
		})
		.countBy(_.identity)
		.valueOf()
}

var content = fs.readFileSync('./SMSSpamCollection', {encoding : 'utf-8'}),
	structuredContent = fromRawToStructured(content),
	trainingData = structuredContent.slice(0, structuredContent.length-1000),
	validationData = structuredContent.slice(structuredContent.length-1000, structuredContent.length);

var transformation = _.compose(
		bagOfWords,
		removePunctuation
	),
	data = transformation(trainingData);

var classifier = new SpamClassifier();
classifier.train(data);

var predOk = 0;
for (var i = 0; i < validationData.length; i++) {
	var msg = validationData[i],
		isSpam = classifier.isSpam(msg.content),
		predictionIsAccurate = false;
	if ((isSpam && msg.type=='spam') || (!isSpam && msg.type=='ham')) {
		predictionIsAccurate = true;
		predOk++;
	}
}
console.log('accuracy: ', predOk / validationData.length);
console.log(classifier.isSpam("new promotion call 012854 to buy stuff, go to http://lawl !!"));
console.log(classifier.isSpam('hi buddy, how u doin ?'));