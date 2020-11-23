const Car = require('../models/User');

exports.find  = async(req,res,next)=>{
try {
    const carfind = await Car.findOne({firstnum: req.query.firstnum  }).select('name telephone line');
    if(!carfind){
        throw new Error('ไม่พบทะเบียนนี้ในระบบ');
    }
    res.status(200).json({
        data:carfind
    });
} catch (error) {
    res.status(400).json({
        error:{
            message: 'เกิดข้อผิดพลาดขึ้น '+ error.message
    }
    });
}
}