
let md5 = require('blueimp-md5/js/md5')
let jsSHA = require("jssha");
//let SHA256 = require("crypto-js/sha256");
function apiSecurity(params,header,method){

    let urlSign = "";
    if (method == 'POST' || method == 'PUT'){
        // if (params != null && params.length>0){
        //     urlSign = md5(params)
        // }
        if (params != null){
            urlSign = md5(params)
        }
    }else if (method == 'GET' || method == 'DELETE') {
        if (params != null && params.length>0){
            urlSign = params
        }
    }
    let timestamp = header['Timestamp'];
    let udid = header['UDID'];
    let salt = "PsZ5bpHZME4djU";
    let sign = "";
    let str = "";
    str = urlSign + timestamp + udid + salt;
    sign = md5(str)


    console.log(sign)

    return sign



}


function pwdSecurity(password,salt){
    let signPwd = ''

    const shaObj = new jsSHA("SHA-256", "TEXT",{ encoding: "UTF8" });
    shaObj.update(salt);
    shaObj.update(password);

    signPwd = shaObj.getHash("B64");

    console.log(signPwd)
    return signPwd
}








// private boolean apiSecurity(HttpServletRequest request, HttpServletResponse response){
//
//     // 安全校验字段（暂定由接口参数+时间戳+加盐：取MD5生成）
//     String signature = RequestHeaderContext.getInstance().getSignature();
//     // 设备唯一标示
//     String udid = RequestHeaderContext.getInstance().getUdid();
//     // 获取时间，进行比对
//     Long timeStamp = RequestHeaderContext.getInstance().getTimeStamp();
//     boolean checkTime = DateUtil.checkTime(timeStamp, 30 * 1000);
//     if (!checkTime) {
//         return responseErrorAPISecurity(response);
//     }
//     if (StringUtils.isEmpty(signature)) {
// //            return responseErrorAPISecurity(response);
//     }
//     // 签名使用
//     StringBuffer urlSign = new StringBuffer();
//
//     String bodyStr;
//     String bodySign;
//     if ("POST".equals(request.getMethod()) || "PUT".equals(request.getMethod())) {
//         bodyStr = RequestReaderUtil.ReadAsChars(request);
//         if (!StringUtils.isEmpty(bodyStr)){
//             bodySign = DigestUtils.md5DigestAsHex((bodyStr).getBytes());
//         } else {
//             bodySign = "";
//         }
//         urlSign = new StringBuffer(bodySign);
//     } else if ("GET".equals(request.getMethod()) || "DELETE".equals(request.getMethod())) {
//         String params = request.getQueryString();
//         if (params == null){
//             params = "";
//         }
//         urlSign = new StringBuffer(params);
//     }
//     String sign = DigestUtils.md5DigestAsHex(urlSign.append(timeStamp).append(udid).append(salt).toString().getBytes());
//     if (signature.equals(sign)) {
//         return true;
//     } else {
//         Integer platform = RequestHeaderContext.getInstance().getPlatform();
//         String version = RequestHeaderContext.getInstance().getVersion();
//         log.warn("安全校验失败, user:{}, platform:{}, version:{}, 加密url:{}, udid:{}, userAgent:{}, 服务端sign:{}, 客户端sign:{}, URI: {}",
//             request.getSession().getAttribute(HttpSessionKeyConstant.USER),
//             platform == 1 ? "iOS" : "Android", version, urlSign, udid, RequestHeaderContext.getInstance().getUserAgent(), sign, signature,
//             HttpUtil.getRequestUri(request));
//         return responseErrorAPISecurity(response);
//     }
// }


export {apiSecurity,pwdSecurity}
