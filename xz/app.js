/*········导入核心模块·······*/
const express=require('express');
const bodyParser=require('body-parser')
const path=require('path')
/*······引入自定义文件模块·······*/
var userRouter=require(path.join(__dirname,'./routes/user.js'))
var productRouter=require(path.join(__dirname,'./routes/product.js'))
var app=express();
/*···········开辟静态资源··········*/ 
app.use(express.static(path.join(__dirname,'./public')))
app.use(bodyParser.urlencoded({extended:false}))
/*············挂载路由·············*/ 
app.use('/user',userRouter)
app.use('/product',productRouter)
/*·············测试················*/ 
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'./public/index.html'))
    //console.log(__dirname)
})
/* ···········监听·················*/
app.listen(8080,function(){
    console.log('loading...')
})
