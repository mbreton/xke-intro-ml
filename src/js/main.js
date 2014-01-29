$(function () {
    "use strict";

    // Dimmer initializing ...
    var $iframe = $('#result');
    var code = "";

    // Ace editor initializing ...
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/ambiance");
    editor.getSession().setMode("ace/mode/javascript");
    editor.setShowPrintMargin(false);
    editor.setOptions({
        enableBasicAutocompletion: true
    });

    var queryStringSrcStart = window.location.hash.indexOf("#src=");
    if (queryStringSrcStart === 0) {
        var encoded = window.location.hash.substring("#src=".length);
        try {
            code = decodeURIComponent(encoded);
        } catch (e) {
            console.log("unable to parse #src= uri component");
        }
    }

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
        code = editor.getValue();
        window.location.hash = "#src="+ encodeURIComponent(code);
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