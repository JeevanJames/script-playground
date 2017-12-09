var btnClear = document.getElementById('clear');
var lstLogs = document.getElementById('logs');

btnClear.addEventListener('click', function() {
    while (lstLogs.firstChild) {
        lstLogs.removeChild(lstLogs.firstChild);
    }
});

var logs = (function() {
    function logs() {}

    function log(messages, color, bgColor) {
        if (!messages) return;
        if (!(messages instanceof Array)) {
            messages = [messages];
        }
        messages.forEach(message => {
            var div = document.createElement('div');
            div.setAttribute('style', `border: solid 1px ${color}; padding: 2px; margin-top: 1px; color: ${color}; background-color: ${bgColor}; font-family: monospace`);
            if (typeof message === 'object') {
                var pre = document.createElement('pre');
                pre.innerText = JSON.stringify(message, null, 4);
                div.appendChild(pre);
            } else {
                div.innerText = message.toString();
            }
            lstLogs.appendChild(div);
        });
    }

    logs.info = function(messages) {
        log(messages, 'blue', 'aliceblue');
    }

    logs.error = function(messages) {
        log(messages, 'red', 'mistyrose')
    }

    return logs;
}());
