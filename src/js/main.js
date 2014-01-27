$(function(){
    "use strict";

    // Dimmer initializing ...
    var $backdrop = $('#backdrop');
    var $iframe = $('#result');

    // Ace editor initializing ...
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/ambiance");
    editor.getSession().setMode("ace/mode/javascript");
    editor.setShowPrintMargin(false);

    editor.on("change", _.debounce(function(e){
        $backdrop.addClass('active');
        $iframe[0].contentWindow.location.reload();
    }, 500));

    $iframe.load(_.bind(function(){
        $backdrop.removeClass('active');
        var code = editor.getValue();
        var script = $iframe[0].contentWindow.document.createElement("script");
        script.type = "text/javascript";
        script.innerHTML = code;
        $iframe[0].contentWindow.document.body.appendChild(script);
    },this));
});