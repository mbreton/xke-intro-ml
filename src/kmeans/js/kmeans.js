"use strict";

function noiseIdentityFunction(centroid, x) {
    return x;
}

function kmeansGenerateDataset(numClusters, sizePerCluster, noise) {
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


function start() {

    mocha.run(function(){
    });

    function noise(centroid, x) {
        var d = distance(centroid, x);

        if (d < 0.1) {
            return [
                x[0] + randFloat(0.1, 0.2),
                x[1] + randFloat(0.1, 0.2)
            ]
        }
        return x;
    }

    var data = kmeansGenerateDataset(4, 30, noise),
        kmeansCanvas = document.getElementById('kmeans-canvas'),
        drawingContext = new KmeansDrawingContext(kmeansCanvas)

    var clusters = kmeans(data.points, 4),
        centroids = clusters.centroids,
        colors = ["#9061C2",
            "#14B694",
            "#EB540A",
            "#A18F68"];

    for (var i = 0; i < centroids.length; i++) {
        drawingContext.cross(centroids[i], colors[i]);
        drawingContext.renderDataSet(clusters.partition[i], colors[i]);
    }
}
