const FCM = require('fcm-node')
const serverKey = "AAAABwwzdSY:APA91bGGXg-r4yNmK2aMp6wXr6jzBrFh0WVYna-mTCeNf5g0Hpa_4ZajrnMkCO2kg7hI_XiFf615eqWA4ruLcBbHiEEhze_WxXsVh9VYCk5N5lO3KWEbFOhFDzIZPm7Ry3u_n6tiAelw";
const fcm = new FCM(serverKey)

// const message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
//     to: 'dUzs8pLYycQ:APA91bF-te6FIHDjSg6bbUBUtpNfrjd6OHWqiNXAwlrVJPbom7RQTM1xiRh1_wvlpxPTc3F4AOtL0M9GChJSunI7XB5JiucsECsi7xvEDEYctSTwhi7lU8xZkTr3oRlM2GTTSSXK2jmv',
//     // collapse_key: 'AIzaSyBCNCtszUkbcgOURxvWFS_py4bs61HvfGk',

//     notification: {
//         title: 'Title of your push notification',
//         body: 'Body of your push notification'
//     }
// }
module.exports.sendNotification = (message) => {
    fcm.send(message, function (err, response) {
        if (err) {
            console.log("Something has gone wrong!", err)
        } else {
            console.log("Successfully sent with response: ", response)
        }
    })

}




















// const admin = require('firebase-admin');


// const serviceAccount = require('/var/www/html/photsharing_ios/server/komal-1d5c3-firebase-adminsdk-uobb7-61fd8bb911.json');

// admin.initializeApp ({
//     credential: admin.credential.cert(serviceAccount),
//     databaseUrl:"https://komal-1d5c3.firebaseio.com"
// })

// const registrationToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZjkxNmFkMjFlOTRjNTk5MDkwMzVhNiIsImlhdCI6MTU2Mzc3NjA4NSwiZXhwIjoxNTYzODYyNDg1fQ.g47GNmm0bfs5ynaAuSvna_K8TLDgGkbKALJ1lFGupbw"
// const payload =  {
//     data:{
//         message:'hello world'
//     }
// };

// const options={
//     priority:'high',
//     timeToLive:60*60*24
// };
// console.log('data=========>',registrationToken,payload,options)
// admin.messaging().sendToDevice(registrationToken,payload,options)
// .then(Response =>{
//     console.log("successfully send message====>",Response.results[0].error);
// })
// .catch(error=>{
//     console.log("error in sending message==========>",error);
// })