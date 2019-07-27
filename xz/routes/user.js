const express=require('express');
const path=require('path')
var router=express.Router();
var pool=require(path.join(__dirname,'../pool.js'))

//注册页面
router.post('/reg',function(req,res){
    var obj=req.body
    //遍历每个输入框，检测输入内容是否为空
    n=400;
    for(var key in obj){
        n++;
        if(!obj[key]){
            res.send({code:n,msg:key+' required'})
            return;
        }
    }
    //执行sql语句，传入一个对象
    pool.query(`insert into xz_user set?`,[req.body],function(err,result){
        if(err) throw err
        //当sql语句执行成功时，affectedRows=1
        if(result.affectedRows>0){
            res.send({code:200,msg:'register suc'})
        }
    })
})
//登录页面
router.post('/login',function(req,res){
    var obj=req.body;
    var n=400
    for(var key in obj){
        n++;
        if(!obj[key]){
            res.send({code:n,msg:key+' required'})
            return;
        }
    }
    pool.query('select * from xz_user where uname=? and upwd=?',[obj.uname,obj.upwd],
    function(err,result){
        if(err) throw err;
        
        if(result.length>0){
            res.send({code:200,msg:'login suc'})
        }else {
            res.send({code:301,msg:'login err'})
        }
    })
})
//查询用户
router.get('/detail',function(req,res){
    var obj=req.query
    //检查输入内容是否为空
    if(!obj.uid){
        res.send({code:401,msg:'uid required'})
        return; //结束程序
    }
    //执行查询语句
    pool.query('select * from xz_user where uid=?',[obj.uid],
    function(err,result){
        if(err) throw err
        //判断是否检索到用户，如果检索到，把该用户对象响应到浏览器，否则响应检索不到
        if(result.length>0){
            res.send(result[0])
        }else{
            res.send({code:301,msg:'can not found'})
        }
        
    })
})
//用户信息更改
router.get('/update',function(req,res){
    var obj=req.query
    //批量验证
    var n=400;
    for(var key in obj){
        n++;
        if(!obj[key]){
            res.send({code:n,msg:key+' required'})
            return;
        }
    }
    pool.query('update xz_user set ? where uid=?',[obj,obj.uid],
    function(err,result){
       if(err) throw err
       if(result.affectedRows>0){
          res.send({code:200,msg:'update suc'})
       }else{
        res.send({code:301,msg:'update error'})
       }
   })
})
//分页查询
router.get('/list',function(req,res){
   // console.log(req.query)
    var obj=req.query
    var pno=obj.pno;
    var size=obj.size
    //如果页码为空，默认为1
    if(!pno)  pno=1
    if(!size) size=3
    //将数转为整形
    pno=parseInt(pno)
    size=parseInt(size)
    //计算开始查询的值
    var start=(pno-1)*size
    pool.query('select * from xz_user limit ?,?',[start,size],
    function(err,result){
        if(err) throw err
        res.send(result)
    })
})
router.get('/delete',function(req,res){
    var obj=req.query;
    if(!obj.uid){
        res.send({code:401,msg:'uid required'})
        return; //结束程序
    }
    pool.query('delete from xz_user where uid=?',[obj.uid],function(err,result){
        if(err) throw err
        if(result.affectedRows>0){
            res.send({code:200,msg:'delete suc'})
        }else{
            res.send({code:401,msg:'delete error'})
        }
    })

})
module.exports=router;