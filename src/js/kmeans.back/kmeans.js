(function ($$, undefined) {
    "use strict";

    function kmeans (points, numClusters, centroids) {
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
        if (centroids.length <= 0) {
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
        return _.map(partitioned,determineNewCentroid);
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
        var deltaX2 = (p[0] - v[0]) * (p[0] - v[0]),
            deltaY2 = (p[1] - v[1]) * (p[1] - v[1]);
        return Math.sqrt(deltaX2 + deltaY2);
    }

    function randInt(a, b) {
        return Math.floor(randFloat(a, b));
    }

    function noiseIdentityFunction(centroid, x) {
        return x;
    }

    function generateDataset(numClusters, sizePerCluster, noise) {
        var points = [],
            centroids = [],
            _noise = noise || noiseIdentityFunction;

        while (numClusters--) {
            var centroid = [randFloat(-1, 1), randFloat(-1, 1)],
                rawPoints = generateRadialCluster(centroid, sizePerCluster),
                f = _.partial(_noise, centroid);
            points = points.concat(rawPoints.map(f));
            centroids.push(centroid);
        }

        return {
            points: points,
            centroids: centroids
        };
    }

    function generateRadialCluster(centroid, clusterSize, radius) {
        var _clusterSize = clusterSize || 100,
            _radius = radius || 0.2,
            clusterPoints = [],
            d = 0,
            alpha = 0;

        while (_clusterSize--) {
            d = randFloat(0, _radius);
            alpha = randFloat(0, 2 * Math.PI);
            clusterPoints.push([
                centroid[0] + d * Math.cos(alpha),
                centroid[1] + d * Math.sin(alpha)
            ])
        }

        return clusterPoints;
    }

    function randFloat(a, b) {
        var t = Math.random();
        return t * a + (1 - t) * b;
    }

    function KmeansDrawingContext(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.Ox = this.canvas.width / 2;
        this.Oy = this.canvas.height / 2;
        this.radius = 2;
    }

    KmeansDrawingContext.prototype = {
        renderDataSet: function (points, color) {
            var _color = color || 'blue';

            for (var i = 0; i < points.length; i++) {
                this.circle(points[i], _color);
            }
        },
        circle: function (p, color) {
            var c = this.toGraphCoord(p);
            this.context.beginPath();
            this.context.arc(c[0], c[1], this.radius, 0, 2 * Math.PI, false);
            this.context.fillStyle = color || 'red';
            this.context.fill();
        },
        cross: function (p, color) {
            var c = this.toGraphCoord(p);
            this.context.beginPath();
            this.context.strokeStyle = color || 'red';
            this.context.moveTo(c[0] - 5, c[1] - 5);
            this.context.lineTo(c[0] + 5, c[1] + 5);
            this.context.moveTo(c[0] - 5, c[1] + 5);
            this.context.lineTo(c[0] + 5, c[1] - 5);
            this.context.stroke();
        },
        toGraphCoord: function (p) {
            return [
                this.Ox + p[0] * this.Ox,
                this.Oy - p[1] * this.Oy
            ];
        },
        clear: function () {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
    };

    $$.kmeansGenerateDataset = generateDataset;
    $$.kmeans = kmeans;
    $$.randFloat = randFloat;
    $$.KmeansDrawingContext = KmeansDrawingContext;
    $$.distance = distance;
})(window);