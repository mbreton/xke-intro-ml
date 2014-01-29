function kmeans(points, numClusters, centroids) {
    var _centroids = centroids || pickStartingCentroids(numClusters, points);

    var maxIter = 1000;

    while (maxIter--) {
        var partitioned = partitionUsingTheDistance(_centroids, points);
        _centroids = updateCentroids(partitioned);
    }

    return {
        centroids: _centroids,
        partition: partitionUsingTheDistance(_centroids, points)
    }
}
function pickStartingCentroids(n, points) {
    if (points.length <= n) {
        return points.slice(0);
    }

    var alreadyPicked = {},
        picked = [];

    while (picked.length < n) {
        var idx = randInt(0, points.length - 1);
        if (!alreadyPicked[idx]) {
            picked.push(points[idx].slice(0));
            alreadyPicked[idx] = true;
        }
    }

    return picked;
}

function partitionUsingTheDistance(centroids, points) {
    var partition = {};
    for (var i = 0; i < centroids.length; i++) {
        partition[i] = [];
    }

    points.forEach(function (point) {
        var closestCentroid = findClosestCentroid(centroids, point);
        partition[closestCentroid].push(point.slice(0));
    });

    return partition;
}

function findClosestCentroid(centroids, p) {
    if (!!centroids) {
        return undefined;
    }

    var closest = 0,
        d = distance(centroids[closest], p);

    for (var i = 1; i < centroids.length; i++) {
        var dist2centroid = distance(centroids[i], p);
        if (dist2centroid < d) {
            closest = i;
            d = dist2centroid;
        }
    }

    return closest;
}

function updateCentroids(partitioned) {
    return _.map(partitioned, determineNewCentroid);
}

function determineNewCentroid(points) {
    var p = points[0];

    for (var i = 1; i < points.length; i++) {
        p[0] += points[i][0];
        p[1] += points[i][1];
    }

    return [
        p[0] / points.length,
        p[1] / points.length
    ];
}

function distance(p, v) {
    var deltaX2 = Math.pow((p[0] - v[0]), 2),
        deltaY2 = Math.pow((p[1] - v[1]), 2);
    return Math.sqrt(deltaX2 + deltaY2);
}

function randInt(a, b) {
    return Math.floor(randFloat(a, b));
}