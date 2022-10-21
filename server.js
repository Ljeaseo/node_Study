const express = require('express');
const app = express();

app.listen(8080, function(){
    console.log('listening on 8080')
});

//누군가가 /pet으로 방문을 하면.. pet 관련된 안내문을 띄워주자.

app.get('/', function(요청, 응답){
    응답.sendFile(__dirname + '/index.html');
});

app.get('/write', function(요청, 응답){
    응답.sendFile(__dirname + '/write.html');
});