const nodemailer = require('../config/nodemailer')
module.exports.link = async function(req,res){
    let info = await nodemailer.transporter.sendMail({
        from: '<anirudh.bhat.006@zohomail.in>',
        to: '<anirudh.bhat.006@gmail.com>',
        subject: "Contact us from ANIRUDH APP",
        text: `Name : ${req.body.name} ,email: ${req.body.Email}, Phone : ${req.body.Phone} ,Message: ${req.body.message}`
    });
    return res.redirect('/');
}