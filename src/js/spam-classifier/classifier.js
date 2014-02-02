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
