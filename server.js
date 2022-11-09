const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.set('view egine', 'ejs');


const MongoClient = require('mongodb').MongoClient;
var db;
MongoClient.connect('mongodb+srv://admin:qwer1234@cluster0.xsxj2cq.mongodb.net/?retryWrites=true&w=majority', function(에러,client){
    
    //에러처리.
    if(에러) return console.log(에러)

    db = client.db('todoapp');
    
    app.listen(8080, function(){
        console.log('listening on 8080')
    });


    //post요청으로 데이터 저장하기.
    app.post('/add',function(요청,응답){
    
        응답.send('글쓰기 성공');
        
        db.collection('counter').findOne({name : '게시물갯수' },function(에러, 결과){
            console.log(결과.totalPost);
            
            var 총게시물갯수 = 결과.totalPost;
            
            // DB에 저장될 입력 데이터
            db.collection('post').insertOne({_id : 총게시물갯수+1, title:요청.body.title, date:요청.body.date}, function(에러,결과){
                
                console.log('저장완료');
                
                //totalPost 1씩 증가
                db.collection('counter').updateOne({name:'게시물갯수'},{ $inc : {totalPost:1} },function(에러,결과){
                    if(에러) {return console.log(에러)}
                });
                
            });
            
        });
        
        
        
    });
    
    // /list로 GET 요청으로 접속하면 실제 DB에 저장된 데이터들로 꾸며진 HTML을 보여줌
    app.get('/list', function(요청,응답){
        
        //DB에 저장된 post라는 collection 안에 모든 데이터를 꺼내주세요.
        db.collection('post').find().toArray(function(에러, 결과){ // 콜렉션 post 안의 모든 데이터
            console.log(결과);
            응답.render('list.ejs',{ posts : 결과 });
        }); 

    });

});






// 메인페이지
app.get('/', function(요청, 응답){
    응답.sendFile(__dirname + '/index.html');
});

// 글쓰기 페이지
app.get('/write', function(요청, 응답){
       
    응답.sendFile(__dirname + '/write.html');
});


