import $ from 'jquery';

const autoType = function (elementId, textToType, beforeLinesAdd, onFinishCallback) {
    var textBox = $(elementId);

    var text = textToType.trim().split('');

    var amntOfChars = text.length;

    var typeSpeed = 10;

    var timeout = 0;

    if (beforeLinesAdd > 0)
    {
        for (var i = 0; i < beforeLinesAdd; i++) {} 
            textBox.append('<br /><br />');
    }

    setTimeout(function () {
        for (var i = 0; i < amntOfChars; i++) {
            (function (i, char) {
                setTimeout(function () {
                
                if (char === '@')
                    char = '<br /><br />';

                textBox.append(char);

                if (i === amntOfChars-1)
                    onFinishCallback();
                
                textBox.scrollTop(Number.MAX_SAFE_INTEGER);
                
                }, i * typeSpeed);
            })(i, text[i]);
        }
    }, timeout);
}

export default autoType;