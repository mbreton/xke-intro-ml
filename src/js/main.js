$(function () {
    "use strict";

    // Dimmer initializing ...
    var $backdrop = $('#backdrop');
    var $iframe = $('#result');
    var LOCALSTORAGE_KEY = 'com.xebia.xke.ml.code';
    var code = '';

    // Ace editor initializing ...
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/ambiance");
    editor.getSession().setMode("ace/mode/javascript");
    editor.setShowPrintMargin(false);

    if (!!localStorage && !!localStorage.getItem(LOCALSTORAGE_KEY)) {
        code = localStorage.getItem(LOCALSTORAGE_KEY);
        editor.setValue(code);
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
        try{
            $iframe[0].contentWindow.document.body.appendChild(script);
        } catch (e){
            console.warn('An error has been detected in the written code.', e);
        }
    }, this));
});