$(function () {
    "use strict";

    // Dimmer initializing ...
    var $backdrop = $('#backdrop');
    var $iframe = $('#result');
    var LOCALSTORAGE_KEY = 'com.xebia.xke.ml.code';
    var code = localStorage.getItem(LOCALSTORAGE_KEY);

    // Ace editor initializing ...
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/ambiance");
    editor.getSession().setMode("ace/mode/javascript");
    editor.setShowPrintMargin(false);

    if (!!code) {
        editor.setValue(code);
    } else {
        setTimeout(function () {
            introJs().setOptions({
                showStepNumbers: false,
                steps: [
                    {
                        element: ".ace_scroller",
                        intro: "Vous trouverez ici votre éditeur où vous devrez implémenter les différents algorithmes des exercices",
                        position: "right"
                    },
                    {
                        element: ".ui.column.dimmable",
                        intro: "Ici, vous aurez le résultat de ce vous être en train d'implémenter",
                        position: "left"
                    }
                ]
            }).start();
        }, 200);
    }

    editor.on("change", _.debounce(function () {
        $backdrop.addClass('active');
        code = editor.getValue();
        localStorage.setItem(LOCALSTORAGE_KEY, code);
        $iframe[0].contentWindow.location.reload();
    }, 500));

    $iframe.load(_.bind(function () {
        $backdrop.removeClass('active');
        var script = $iframe[0].contentWindow.document.createElement("script");
        script.type = "text/javascript";
        script.innerHTML = code;
        try {
            $iframe[0].contentWindow.document.body.appendChild(script);
            $iframe[0].contentWindow.start();// call start function in the iframe
        } catch (e) {
            console.warn('An error has been detected in the written code.', e);
        }
    }, this));
});