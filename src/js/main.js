$(function () {
    "use strict";

    // Dimmer initializing ...
    var $iframe = $('#result');
    var code = "",
        state = {};

    try {
        state = JSON.parse(atob(decodeURIComponent($.url().fparam("state"))));
    } catch (e) {
        console.log("unable to parse the URL");
    }

    var contextMapping = {
        'kmeans' : {
            'result-page' : 'kmeans/kmeans.html'
        },
        'naive-bayes' : {
            'result-page' : 'spam-classifier/classifier.html'
        }
    };

    $('.algo-link').click(function(e) {
        e.preventDefault();
        var key = $(this).attr('href').substring(1);
        $iframe[0].contentWindow.location = contextMapping[key]['result-page'];
    });

    // Ace editor initializing ...
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/ambiance");
    editor.getSession().setMode("ace/mode/javascript");
    editor.setShowPrintMargin(false);
    editor.setOptions({
        enableBasicAutocompletion: true
    });

    code = state && state.code;

    if (!!code) {
        editor.setValue(code, -1);
    } else {
        setTimeout(function () {
            introJs().setOptions({
                showStepNumbers: false,
                steps: [
                    {
                        element: "#editor",
                        intro: "Vous trouverez ici votre éditeur où vous devrez implémenter les différents algorithmes des exercices",
                        position: "right"
                    },
                    {
                        element: "#result",
                        intro: "Ici, vous aurez le résultat de ce vous être en train d'implémenter",
                        position: "left"
                    }
                ]
            }).start();
        }, 200);
    }

    editor.on("change", _.debounce(function () {
        var state = {code : editor.getValue()};
        window.location.hash = "#state="+ encodeURIComponent(btoa(JSON.stringify(state)));
        $iframe[0].contentWindow.location.reload();
    }, 500));

    $iframe.load(_.bind(function () {
        var script = $iframe[0].contentWindow.document.createElement("script");
        script.type = "text/javascript";
        script.innerHTML = code;
        $iframe[0].contentWindow.document.body.appendChild(script);
        $iframe[0].contentWindow.start();// call start function in the iframe
    }, this));
});