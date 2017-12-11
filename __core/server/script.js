var btnClear = document.getElementById('clear');
var btnFilterInfo = document.getElementById('filter-info');
var btnFilterError = document.getElementById('filter-error');
var btnAll =document.getElementById('all');
var lstLogs = document.getElementById('logs');

btnClear.addEventListener('click', function() {
    while (lstLogs.firstChild) {
        lstLogs.removeChild(lstLogs.firstChild);
    }
});

function toggleDisplay(toShow, toHide) {
    (toShow || []).forEach(function(name) {
        document.getElementsByName(name).forEach(function(e) { e.style.display = 'block'; });
    });
    (toHide || []).forEach(function(name) {
        document.getElementsByName(name).forEach(function(e) { e.style.display = 'none'; });
    });
}

btnFilterInfo.addEventListener('click', function() {
    toggleDisplay(['info'], ['error']);
});
btnFilterError.addEventListener('click', function() {
    toggleDisplay(['error'], ['info']);
});
btnAll.addEventListener('click', function() {
    toggleDisplay(['info', 'error']);
})

var logs = (function() {
    function logs() {}

    function log(messages, type) {
        if (!messages) return;
        if (!(messages instanceof Array)) {
            messages = [messages];
        }
        messages.forEach(message => {
            var div = document.createElement('div');
            div.setAttribute('name', type);
            const cssClass = type === 'info' ? 'log info' : 'log error';
            div.setAttribute('class', cssClass);
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
        log(messages, 'info');
    }

    logs.error = function(messages) {
        log(messages, 'error')
    }

    return logs;
}());
