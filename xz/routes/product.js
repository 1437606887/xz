const express=require('express');
const path=require('path')
var pool=require(path.join(__dirname,'../pool.js'))
var router=express.Router();
/*·········查询商品列表··········*/
router.get('/list',function(req,res){
    // console.log(req.query)
     var obj=req.query;
     var pno=obj.pno;
     var count=obj.count;
     if(!pno)  pno=1
     if(!count) count=3
     pno=parseInt(pno);
     count=parseInt(count);
     var start=(pno-1)*count;
     pool.query('select lid,title,price from xz_laptop limit ?,?',[start,count],
    function(err,result){
        if(err) throw err
        res.send(result)
    })
})
/* ········查询商品详情··········*/
router.get('/detail',function(req,res){
    var obj=req.query
    console.log(obj.lid)
    pool.query('select * from xz_laptop where lid=?',[obj.lid],function(err,result){
        if(err) throw err
        res.send(result)
    })
})
/*··········添加商品·············*/ 
router.post('/add',function(req,res){
    var obj=req.body
    pool.query('insert into xz_laptop set?',[obj],function(err,result){
        if(err) throw err
        if(result.affectedRows>0){
            res.send('succ')
        }
    })
})
module.exports=router;