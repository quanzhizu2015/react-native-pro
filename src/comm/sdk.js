import {action,observable} from 'mobx';
import {cn} from '../lan/cn';
import {en} from '../lan/en';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import {isEmail} from './Tool';
import {apiHost, tradeApiHost} from './config';
import {getHeaders} from './DeviceInfo';
import {apiSecurity} from './webSocket/UnitTool';
import {koa} from '../lan/koa';
import {WebSocketClient} from './webSocket/WebSocketClient';


class AppState {
    @observable loaded = false;
    @observable login = false;
    @observable token = '';
    @observable lan = cn;
    @observable phone = '';
    @observable userName = '';
    @observable userUrl = '';
    @observable user_id = '';
    @observable sex= -1;
    @observable lanIndex = 0;
    @observable birth = '';
    @observable sign= '';
    @observable address='';
    @observable invitation_code='';
    @observable is_node_user=0;
    @observable has_backed_up = 0;
    @observable area='';
    @observable mobile='';
    @observable isUpdatePersonInfo=false;
    @observable trade_token='';
    @observable tradePwd_token='';

    @action setState(state) {
        // console.log('setState = ', state);
        for (let k in state) {
            this[k] = state[k]
        }
    }
}

const appState = new AppState();


let _token = ''
let currentUserName = ''
let _phone = ''

let trade_token = ''


async function setTradeToken(tradeToken){


    trade_token = tradeToken
    let obj = {trade_token:tradeToken}
    let objStr = JSON.stringify(obj)
    await AsyncStorage.setItem('tradeToken', objStr); // 缓存语言信息

    appState.setState({trade_token:tradeToken})
}

async function loadLan(){

    let lan = cn
    let lanObject = await AsyncStorage.getItem('language')     // 从缓存读取登录信息
    if (lanObject != null) {
        try {
            lanObject = JSON.parse(lanObject)
            if(lanObject.lanIndex == 0){
                lan = cn
            }else if(lanObject.lanIndex == 1){
                lan = koa
            }

        }catch (e) {

        }
    }

    appState.setState({lanIndex:lanObject.lanIndex,lan:lan})
}

async function saveLanIndex (lanIndex){
    await AsyncStorage.setItem('language', JSON.stringify({lanIndex:lanIndex})); // 缓存语言信息

}

async function setToken(token,phone,userName,url,sex,birth,sign,address,invitation_code,area,mobile,is_node_user,has_backed_up) {
    _token = token
    currentUserName = userName
    _phone = phone
    if (!phone){
        phone=''
    }
    if (!userName){
        userName=''
    }

    if (!url){
        url=''
    }
    if (sex==null){
        sex=-1
    }

    if (!birth){
        birth=''
    }else {
        birth =moment(birth).format('YYYY-MM-DD')
    }
    if (!sign){
        sign=''
    }
    if (!address){
        address=''
    }
    if (!invitation_code){
        invitation_code = ''
    }
    if (!is_node_user){
        is_node_user = 0
    }

    if (!has_backed_up){
        has_backed_up = 0
    }

    if (!area){
        area = ''
    }
    if (!mobile){
        mobile = ''
    }

    if (token) {
        await AsyncStorage.setItem('user', JSON.stringify({token: token,phone:phone,userName: userName,userUrl:url,sex:sex,birth:birth,sign:sign,address:address,invitation_code:invitation_code,area:area,mobile:mobile,is_node_user:is_node_user,has_backed_up:has_backed_up})); // 缓存登录信息
        appState.setState({login: true,phone:phone,userName:userName,userUrl:url,sex:sex,birth:birth,sign:sign,address:address,invitation_code:invitation_code,area:area,mobile:mobile,is_node_user:is_node_user,has_backed_up:has_backed_up})
    } else {

        WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":-2,"sessionId":trade_token}))
        WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":-5,"type":4}))
        WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":-5,"type":7}))
        WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":-5,"type":2}))
        WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":-5,"type":1}))

        WebSocketClient.getInstance().sendMessage(JSON.stringify({"reqType":1201,"handleType":3,"type":1,"token":trade_token}))
        WebSocketClient.getInstance().sendMessage(JSON.stringify({"id":1,"param":{"pageSize":20,"pageNo":1,"assetId":1,"status":"8,9","type":1,"pairId":"1","tab":1},"reqType":1200,"handleType":3,"type":1,"token":trade_token}))
        WebSocketClient.getInstance().sendMessage(JSON.stringify({"param":{"pageSize":20,"pageNo":1,"startTime":"","endTime":"","type":1,"tab":2},"reqType":1202,"handleType":3,"type":1,"token":trade_token}))





        WebSocketClient.getInstance().destroy()
        await AsyncStorage.removeItem('user'); // 缓存登录信息
        await AsyncStorage.removeItem('tradeToken'); // 缓存登录信息

        appState.setState({login: false,phone:phone,userName:userName,userUrl:url,sex:sex,birth:birth,sign:sign,address:address,invitation_code:invitation_code,area:area,mobile:mobile,is_node_user:is_node_user,has_backed_up:has_backed_up})
    }
}



async function updateName(username,has_backed){
    let dbUser = await AsyncStorage.getItem('user')     // 从缓存读取登录信息
    if (dbUser != null) {
        try {
            dbUser = JSON.parse(dbUser)
            let token = dbUser.token
            currentUserName = dbUser.userName
            _phone = dbUser.phone

            let phone = dbUser.phone

            let userName = dbUser.userName
            if(username){
                userName = username
            }

            //let userId = dbUser.userId
            let url= dbUser.userUrl
            if(url== null){
                url = ''
            }
            let sex = dbUser.sex
            let birth = dbUser.birth
            let sign = dbUser.sign
            let address = dbUser.address
            let invitation_code = dbUser.invitation_code
            let area = dbUser.area

            let mobile = dbUser.mobile
            let is_node_user = dbUser.is_node_user

            let has_backed_up = dbUser.has_backed_up
            if (has_backed){
                has_backed_up = has_backed
            }


            if (_token) {
                //setToken(token,phone,userName,url,sex,birth,sign,address,invitation_code,area,mobile)
                await AsyncStorage.setItem('user', JSON.stringify({token: token,phone:phone,userName: userName,userUrl:url,sex:sex,birth:birth,sign:sign,address:address,invitation_code:invitation_code,area:area,mobile:mobile,is_node_user:is_node_user,has_backed_up:has_backed_up})); // 缓存登录信息

            }else {
                await setToken(null,null,null)
            }
        } catch (e) {

        }
    }
}



async function autoLogin(token){
    let dbUser = await AsyncStorage.getItem('user')     // 从缓存读取登录信息
    if (dbUser != null) {
        try {
            dbUser = JSON.parse(dbUser)
            _token = token==null?dbUser.token:token
            currentUserName = dbUser.userName
            _phone = dbUser.phone


            let phone = dbUser.phone
            let userName = dbUser.userName
            //let userId = dbUser.userId
            let url= dbUser.userUrl
            if(url== null){
                url = ''
            }
            let sex = dbUser.sex
            let birth = dbUser.birth
            let sign = dbUser.sign
            let address = dbUser.address
            let invitation_code = dbUser.invitation_code
            let area = dbUser.area

            let mobile = dbUser.mobile
            let is_node_user = dbUser.is_node_user

            let has_backed_up = dbUser.has_backed_up


            let tradeObject = await AsyncStorage.getItem('tradeToken')     // 从缓存读取登录信息
            if (tradeObject != null) {

                tradeObject = JSON.parse(tradeObject)

                trade_token = tradeObject.trade_token
                appState.setState({trade_token:trade_token})

            }



            if (_token) {
                //setToken(token,phone,userName,url,sex,birth,sign,address,invitation_code,area,mobile)
               await setToken(_token,phone,userName,url,sex,birth,sign,address,invitation_code,area,mobile,is_node_user,has_backed_up);
               return true

            }else {
               await setToken(null,null,null)
                return false
            }
        } catch (e) {
            return false

        }
    }
}




function getUser() {
    return {
        userName: currentUserName,
        token: _token,
        phone:_phone
    }
}

// 发送验证码
/*
/send/verification/code    --post  发送验证码

| area   | string | 区号                                                         |
| mobile | string | 手机号码或者邮箱                                             |
| type   | int    | 1-注册 2-更改绑定手机旧手机验证码 3-更改绑定手机新手机验证码 4-忘记密码 5-修改交易密码 6-转账 |
*/


// private Integer type; //1 注册 2 修改密码  3重置密码 4登陆 5修改手机号。//1、5会验证手机验证码
// private String phone;
// private String email;
// private Integer regType;   //1手机  2邮箱

async function sendMsg(params = {area: '', mobile: '', type: ''}) {

    console.log('sendMsg')
    return http_post(`${apiHost}/send/verification/code`, params).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('logout error');
    })


}




// 注册
/*/user/reg
| area         | string | 区号       |
| mobile       | string | 手机号码 或者邮箱  |
| username     | string | 用户名     |
| password     | string | 登录密码   |
| pay_password | string | 支付密码   |
| inviter      | string | 邀请码     |
| code         | string | 短信验证码 |
*/
async function register(params = {area: '', mobile: '', username:'',password: '',pay_password:'',inviter:'',code:'',device_no:''}) {

    console.log('register')
    return http_post(`${apiHost}/user/reg`, params).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('logout error');
    })
}

//登陆
/*
/user/login
| username | string | 用户名   |
| password | string | 登录密码 |
*/
async function login(params = {username: '', password: '',device_no:''}) {

    console.log('login')
    return http_post(`${apiHost}/user/login`, params).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}


// 助记词登录
//
// 请求方式
//
// POST
//
// 请求地址
//
// /user/mnemonicLogin

async function mnemonicLogin(params = {mnemonic: '', device_no:''}) {

    console.log('login')
    return http_post(`${apiHost}/user/mnemonicLogin`, params).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}


// 私钥登录
//
// 请求方式
//
// POST
//
// 请求地址
//
// /user/privateKeyLogin

async function privateKeyLogin(params = {private_key: '', device_no:''}) {

    console.log('login')
    return http_post(`${apiHost}/user/privateKeyLogin`, params).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}


// 验证码登录
//
// 请求方式
//
// POST
//
// 请求地址
//
// /user/codeLogin

async function userCodeLogin(params = {mobile: '', code: ''}) {

    console.log('login')
    return http_post(`${apiHost}/user/codeLogin`, params).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}





//忘记密码
/*/user/forget/password
| mobile   | string | 手机号码     |
| code     | string | 短信验证码   |
| username | string | 用户名       |
| password | string | 新的登录密码 |
*/

async function forgetPwd(params = {mobile: '', code: '',username:'',password:''}) {

    console.log('login')
    return http_post(`${apiHost}/user/forget/password`, params).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}


//退出登录
/*请求方式

POST

请求地址

/logout*/

async function logout() {

    console.log('login')
    return http_post(`${apiHost}/logout`, {},{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}



//修改密码
/*
请求方式

POST

请求地址

/change/password
*/

async function changePassword(params) {

    console.log('login')
    return http_post(`${apiHost}/change/password`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}

//修改交易密码
/*
请求方式

POST

请求地址

/change/transaction/password
*/

async function changeTraPassword(params) {

    console.log('login')
    return http_post(`${apiHost}/change/transaction/password`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}


//更换手机
/*
请求方式

POST

请求地址

/user/change/mobile
*/

async function changeMobile(params) {

    console.log('changeMobile')
    return http_post(`${apiHost}/user/change/mobile`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}


// 收款 - 根据货币类型获取钱包地址
//
// 请求方式
//
// GET
//
// 请求地址
//
// /wallet/address
//
// 请求头参数


async function walletAddress(params) {
    return http_get(`${apiHost}/wallet/address`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('userInfo error');
    })
}



//首页数据
/*
* 请求方式

GET

请求地址

/index/index*/

async function indexIndex(params) {
    return http_get(`${apiHost}/index/index`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('userInfo error');
    })
}

//作品详情
/*
* 请求方式

GET

请求地址

/work/{work}*/

async function workDetail(ID) {
    return http_get(`${apiHost}/work/${ID}`, {},{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('userInfo error');
    })
}


//公告
/*请求方式

GET

请求地址

/index/notices*/

async function indexNotices(params) {
    return http_get(`${apiHost}/index/notices`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('userInfo error');
    })
}


// 根据网红邀请码获取网红
//
// 请求方式
//
// POST
//
// 请求地址
//
// /questions/code

async function questionsCode(params = {inviter_code: ''}) {
    console.log('login')
    return http_post(`${apiHost}/questions/code`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}


// 获取问卷token
//
// 请求方式
//
// POST
//
// 请求地址
//
// /questions/token

async function scoreToken(params = {code: '',talenter_code:'',target_code:''}) {
    console.log('login')
    return http_post(`${apiHost}/questions/token`, params).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}



//我的矿池页面数据
/*请求方式

GET

请求地址

/miningPool/index*/

async function miningPoolIndex(params) {
    return http_get(`${apiHost}/miningPool/index`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('userInfo error');
    })
}

// 矿池简介
//
// 请求方式
//
// GET
//
// 请求地址
//
// /miningPool/introduction

async function miningPoolIntroduction(params) {
    return http_get(`${apiHost}/miningPool/introduction`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('userInfo error');
    })
}


// 收益明细页面数据
//
// 请求方式
//
// GET
//
// 请求地址
//
// /income/details

async function incomeDetails(params) {
    return http_get(`${apiHost}/income/details`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('userInfo error');
    })
}


// 转入
//
// 请求方式
//
// POST
//
// 请求地址
//
// /miningPool/transferInto

async function transferInto(params = {amount: '',pay_password:''}) {
    console.log('login')
    return http_post(`${apiHost}/miningPool/transferInto`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}


// 转出矿池到钱包
//
// 请求方式
//
// POST
//
// 请求地址
//
// /miningPool/transferOut


async function transferOut(params = {amount: '',pay_password:''}) {
    console.log('login')
    return http_post(`${apiHost}/miningPool/transferOut`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}


// 转账记录
//
// 请求方式
//
// GET
//
// 请求地址
//
// /miningPool/transferRecord

async function transferRecord(params) {
    return http_get(`${apiHost}/miningPool/transferRecord`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('userInfo error');
    })
}



// 算力分布
//
// 请求方式
//
// GET
//
// 请求地址
//
// /miningPool/computingPower

async function miningPoolComputingPower(params) {
    return http_get(`${apiHost}/miningPool/computingPower`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('userInfo error');
    })
}


// 青峰算力分布
//
// 请求方式
//
// GET
//
// 请求地址
//
// /miningPool/qinfeng

async function miningPoolQinfeng(params) {
    return http_get(`${apiHost}/miningPool/qinfeng`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('userInfo error');
    })
}

// 冰峰算力分布
//
// 请求方式
//
// GET
//
// 请求地址
//
// /miningPool/icePower

async function miningPoolIcePower(params) {
    return http_get(`${apiHost}/miningPool/icePower`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('userInfo error');
    })
}

// 邀请算力分布
//
// 请求方式
//
// GET
//
// 请求地址
//
// /miningPool/invite

async function miningPoolInvite(params) {
    return http_get(`${apiHost}/miningPool/invite`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('userInfo error');
    })
}


// 转入签约
//
// 请求方式
//
// POST
//
// 请求地址
//
// /netRedFund/transferInto

async function netRedFundTransferInto(params = {coin_num: '',address:'',pay_password:''}) {
    console.log('login')
    return http_post(`${apiHost}/netRedFund/transferInto`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}



// 转出到钱包页面数据
//
// 请求方式
//
// GET
//
// 请求地址
//
// /netRedFund/transferOutView

async function netRedFundTransferOutView(params) {
    return http_get(`${apiHost}/netRedFund/transferOutView`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('userInfo error');
    })
}


// 全部转出到钱包
//
// 请求方式
//
// POST
//
// 请求地址
//
// /netRedFund/transferOutToWallet

async function netRedFundTransferOutToWallet(params = {pay_password: ''}) {
    console.log('login')
    return http_post(`${apiHost}/netRedFund/transferOutToWallet`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}



// 续签
//
// 请求方式
//
// POST
//
// 请求地址
//
// /netRedFund/renewal

async function netRedFundRenewal(params={}) {
    console.log('login')
    return http_post(`${apiHost}/netRedFund/renewal`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}



// 签约记录
//
// 请求方式
//
// GET
//
// 请求地址
//
// /netRedFund/log

async function netRedFundLog(params) {
    return http_get(`${apiHost}/netRedFund/log`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('userInfo error');
    })
}


// 对撞
//
// 请求方式
//
// POST
//
// 请求地址
//
// /collision/collide


async function collisionCollide(params={}) {
    console.log('login')
    return http_post(`${apiHost}/collision/collide`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}


// 对撞记录
//
// 请求方式
//
// GET
//
// 请求地址
//
// /collision/log


async function collisionLog(params) {
    return http_get(`${apiHost}/collision/log`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('userInfo error');
    })
}


// 对撞交易页面数据
//
// 请求方式
//
// GET
//
// 请求地址
//
// /collision/transaction


async function collisionTransaction(params) {
    return http_get(`${apiHost}/collision/transaction`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('userInfo error');
    })
}

// 我的比特对撞页面数据
//
// 请求方式
//
// GET
//
// 请求地址
//
// /collision/btcPage


async function collisionBtcPage(params) {
    return http_get(`${apiHost}/collision/btcPage`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('userInfo error');
    })
}


// 资产总估值
//
// 请求方式
//
// GET
//
// 请求地址
//
// /wallet/totalAssetValuation

async function walletTotalAssetValuation(params) {
    return http_get(`${apiHost}/wallet/totalAssetValuation`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('userInfo error');
    })
}


// 交易记录
//
// 请求方式
//
// GET
//
// 请求地址
//
// /wallet/transactionRecord

async function walletTransactionRecord(params = {currency: '',page:1}) {
    return http_get(`${apiHost}/wallet/transactionRecord`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('userInfo error');
    })
}


// 转账页面数据
//
// 请求方式
//
// GET
//
// 请求地址
//
// /wallet/transferPageData

async function walletTransferPageData(params = {currency: '',page:1}) {
    return http_get(`${apiHost}/wallet/transferPageData`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('userInfo error');
    })
}

// 转账页面中查询转账手续费
//
// 请求方式
//
// POST
//
// 请求地址
//
// /wallet/transferFee

async function walletTransferFee(params={}) {
    console.log('login')
    return http_post(`${apiHost}/wallet/transferFee`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}

// 转账-链上收款地址
//
// 请求方式
//
// POST
//
// 请求地址
//
// /wallet/transferOnChain
async function walletTransferOnChain(params={}) {
    console.log('login')
    return http_post(`${apiHost}/wallet/transferOnChain`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}

// 转账-好友收款地址
//
// 请求方式
//
// POST
//
// 请求地址
//
// /wallet/internalTransfer
async function walletInternalTransfer(params={}) {
    console.log('login')
    return http_post(`${apiHost}/wallet/internalTransfer`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}


// 转入详情
//
// 请求方式
//
// GET
//
// 请求地址
//
// /wallet/transferDetail

async function walletTransferDetail(params = {currency: '',page:1}) {
    return http_get(`${apiHost}/wallet/transferDetail`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('userInfo error');
    })
}


// 获取邀请链接及邀请码
//
// 请求方式
//
// GET
//
// 请求地址
//
// /user/invitationLink

async function userInvitationLink(params) {
    return http_get(`${apiHost}/user/invitationLink`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('userInfo error');
    })
}

// 意见反馈
//
// 请求方式
//
// POST
//
// 请求地址
//
// /feedback/store

async function myFeedBack(apiName='/feedback/store',params={images:'',email:'',content:''}){

    params = {
        "files": params.images,
        "email": params.email,
        "content": params.content
    }

    return http_postForm(apiHost+apiName, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })

}

// 获取最新版本
//
// 请求方式
//
// GET
//
// 请求地址
//
// /version/index

async function versionIndex() {
    return http_get(`${apiHost}/version/index`,{}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('userInfo error');
    })
}


// 推广算力分布
//
// 请求方式
//
// GET
//
// 请求地址
//
// /miningPool/promoteComputingPowerDistribution

async function promoteComputingPowerDistribution(params) {
    return http_get(`${apiHost}/miningPool/promoteComputingPowerDistribution`,params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('userInfo error');
    })
}

// 转入页面数据
//
// 请求方式
//
// GET
//
// 请求地址
//
// /miningPool/transferIntoView

async function miningPoolTransferIntoView() {
    return http_get(`${apiHost}/miningPool/transferIntoView`,{},{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('userInfo error');
    })
}


// 转出页面数据
//
// 请求方式
//
// GET
//
// 请求地址
//
// /miningPool/transferOutView

async function miningPoolTransferOutView() {
    return http_get(`${apiHost}/miningPool/transferOutView`,{},{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('userInfo error');
    })
}


// 转出页面数据
//
// 请求方式
//
// GET
//
// 请求地址
//
// /income/logs

async function incomeLogs(params) {
    return http_get(`${apiHost}/income/logs`,params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('userInfo error');
    })
}


// 节点用户公告
//
// 请求方式
//
// GET
//
// 请求地址
//
// /nodeUser/notice

async function nodeUserNotice() {
    return http_get(`${apiHost}/nodeUser/notice`, {},{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('userInfo error');
    })
}


// 修改昵称
//
// 请求方式
//
// POST
//
// 请求地址
//
// /user/usernameUpdate

async function userUsernameUpdate(params={username:''}) {
    console.log('login')
    return http_post(`${apiHost}/user/usernameUpdate`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}


// 用户信息
//
// 请求方式
//
// POST
//
// 请求地址
//
// /user/info


async function userInfo(params={}) {
    console.log('login')
    return http_post(`${apiHost}/user/info`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}


// 助记词
//
// 请求方式
//
// GET
//
// 请求地址
//
// /mnemonic/index

async function mnemonicIndex(token) {
    if (token){
        _token = token
    }
    return http_get(`${apiHost}/mnemonic/index`, {},{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('userInfo error');
    })
}


// 验证助记词是否正确
//
// 请求方式
//
// POST
//
// 请求地址
//
// /mnemonic/check

async function mnemonicCheck(params={}) {
    console.log('login')
    return http_post(`${apiHost}/mnemonic/check`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}

// 备份助记词
//
// 请求方式
//
// POST
//
// 请求地址
//
// /mnemonic/backUp

async function mnemonicBackUp(params={}) {
    console.log('login')
    return http_post(`${apiHost}/mnemonic/backUp`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}

// 验证交易密码
//
// 请求方式
//
// POST
//
// 请求地址
//
// /mnemonic/checkPayPassword

async function checkPayPassword(params={}) {
    console.log('login')
    return http_post(`${apiHost}/mnemonic/checkPayPassword`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}

// 检查是否有上级
//
// 请求方式
//
// POST
//
// 请求地址
//
// /wallet/checkUser

async function walletCheckUser(params={currency:'',address:''}) {
    console.log('login')
    return http_post(`${apiHost}/wallet/checkUser`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}

// 项目详情
//
// 请求方式
//
// GET
//
// 请求地址
//
// /projectDetail/index

async function projectDetailIndex() {
    console.log('login')
    return http_get(`${apiHost}/projectDetail/index`, {},{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}


//获取交易对
///api/app/trade/pair/all

async function tradePairAll() {
    console.log('login')


    let header = getHeaders()
    let Signature =apiSecurity('',header,'GET')
    header = Object.assign({'Signature':Signature},header)

    return http_get(`${tradeApiHost}/api/app/trade/pair/all`, {},header).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}


//  登陆
// /api/app/account/user/login
async function accountUserLogin(params) {

    //console.log('login')
    let header = getHeaders()
    let Signature = apiSecurity(JSON.stringify(params),header,'POST')
    header = Object.assign({'Signature':Signature},header)

    return http_post(`${tradeApiHost}/api/app/account/user/login`, params,header).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}


//  钱包余额
//  /api/app/asset/capital
async function assetCapital() {

    //console.log('login')
    let header = getHeaders()
    let Signature =apiSecurity('',header,'GET')
    header = Object.assign({'Signature':Signature,'token':trade_token},header)

    return http_get(`${tradeApiHost}/api/app/asset/capital`, {},header).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}

//个人历史交易记录
// /api/app/trade//spot/history
// status   3 部分撤单 4 已撤单 8 未成交  9 部分成交 10 已成交

async function tradeSpotHistory(params={}) {

    //console.log('login')
    let header = getHeaders()
    let values = toQueryString(Object.assign({}, params))
    let Signature =apiSecurity(values,header,'GET')
    header = Object.assign({'Signature':Signature,'token':trade_token},header)

    return http_get(`${tradeApiHost}/api/app/trade/spot/history`, params,header).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}

// 交易密码
// /api/app/user/verify/trade/password


async function verifyTradePassword(params={password:''}) {

    //console.log('login')
    let header = getHeaders()
    let Signature = apiSecurity(JSON.stringify(params),header,'POST')
    header = Object.assign({'Signature':Signature,token:trade_token},header)

    return http_post(`${tradeApiHost}/api/app/user/verify/trade/password`, params,header).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}

//下单

// /api/app/trade/usdk/order

async function tradeUsdkOrder(params=
                                  {tradeToken:'',obj:{assetId:'',totalAmount:'',price:'',orderDirection:'',priceType:''}}) {

    //console.log('login')
    let header = getHeaders()
    let Signature = apiSecurity(JSON.stringify(params),header,'POST')
    header = Object.assign({'Signature':Signature,token:trade_token},header)

    return http_post(`${tradeApiHost}/api/app/trade/usdk/order`, params,header).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}

//下单

// /api/app/trade/usdk/order

async function tradeUsdkDelOrder(params={}) {

    //console.log('login')
    let header = getHeaders()
    let Signature = apiSecurity(toQueryString(params),header,'DELETE')
    header = Object.assign({'Signature':Signature,token:trade_token},header)

    return http_delete(`${tradeApiHost}/api/app/trade/usdk/order`, params,header).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}


//  锁仓抢矿页面数据
//  /mining/list
async function miningList() {

    return http_get(`${apiHost}/mining/list`, {},{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('userInfo error');
    })
}


// 检查是否有上级
//
// 请求方式
//
// POST
//
// 请求地址
//
// /mining/lock

async function miningLock(params={product_id:0,type_id:0,pay_password:''}) {
    console.log('login')
    return http_post(`${apiHost}/mining/lock`, params,{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('login error');
    })
}


// 未到期的锁仓矿机
//
// 请求方式
//
// GET
//
// 请求地址
//
// /mining/notExpiredList
async function miningNotExpiredList() {

    return http_get(`${apiHost}/mining/notExpiredList`, {},{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('userInfo error');
    })
}


// 锁仓记录
//
// 请求方式
//
// GET
//
// 请求地址
//
// /mining/allList
async function miningAllList() {

    return http_get(`${apiHost}/mining/allList`, {},{Authorization:'Bearer '+_token}).then(res => {
        return res
    }).catch((e) => {
        console.log(e)
        throw new Error('userInfo error');
    })
}



function toQueryString(params) {
    if (typeof(params) === 'string') {
        return params
    }
    let args = []
    for (let p in params) {
        if (params[p]==null){
            args.push(encodeURIComponent(p))

        }else {
            args.push(encodeURIComponent(p) + '=' + encodeURIComponent(params[p]))
        }

    }
    return args.join('&')
}


async function http_post (url,params, headers) {

    console.log(url, params)


    const header = {
        'Content-Type': 'application/json',
        'Connection':'keep-alive',
        'Accept-Language':appState.lanIndex==0?'zh-cn':appState.lanIndex==1?'ko':'en'
    }

    return fetch(url, {
        method: "POST",
        headers: Object.assign(header, headers),
        body: JSON.stringify(params)
    }).then(res => {
        let header = res.headers.map
        //let aa = header.content-type
        //let contenttype = header['content-type']
        let Authorization = header['Authorization']
        if(!Authorization){
            Authorization = header['authorization']
        }

        if (Authorization){
            Authorization = Authorization.replace('Bearer ','')
            autoLogin(Authorization)
        }
        // console.log('lch--header---', header, url, params)
        // setCookie(res)
        // return res.json()
        // return JSON.parse(res.text().substr(1))
        return res.text()
    }).then(text => {
        let res = JSON.parse(text.trim());
        if (res.code == 401) {
             setToken(null, null)

        }
        return res
    }).catch((e)=>{
        if(process.env.NODE_ENV !== 'production' ){
            console.log("================err post:"+url+e +'\n'+JSON.stringify(formdata))
        }
    })

}


async function http_postForm (url, params, headers) {
    console.log(url, params)
    //url = `${apiHost}`+url;

    let formdata = new FormData();
    params.files.map((item,index)=>{
        formdata.append("images[]",item);
        //formdata.append("images",item);
        //formdata.append("files",item);
    })

    //formdata.append("files",params.files);
    //formdata.append("images",params.images);
    formdata.append("email",params.email);
    formdata.append("content",params.content);
    const header = {
        // "Content-Type": "multipart/form-data"
        'Content-Type': 'multipart/form-data',
        'Connection':'keep-alive',
        'Accept-Language':appState.lanIndex==0?'zh-cn':appState.lanIndex==1?'ko':'en'
        //'Content-Type': 'application/json; charset=utf-8',

    }

    return fetch(url, {
        method: "POST",
        headers: Object.assign(header, headers),
        body: formdata
    }).then(res => {

        let header = res.headers.map
        //let aa = header.content-type
        //let contenttype = header['content-type']
        let Authorization = header['Authorization']
        if(!Authorization){
            Authorization = header['authorization']
        }
        if (Authorization){
            Authorization = Authorization.replace('Bearer ','')
            autoLogin(Authorization)
        }
        // console.log('lch--header---', header, url, params)
        // setCookie(res)
        // return res.json()
        // return JSON.parse(res.text().substr(1))
        return res.text()
    }).then(text => {
        let res = JSON.parse(text.trim());
        if (res.code == 401) {
            setToken(null, null)
            //appState.setState({login: false})
        }
        return res
    }).catch((e)=>{
        if(process.env.NODE_ENV !== 'production' ){
            console.log("================err post:"+url+e +'\n'+JSON.stringify(params))
        }
    })

}

async function http_get(url, params, headers) {
    console.log(url, params)
    let values = toQueryString(Object.assign({}, params))
    console.log('values'+values)
    return fetch(url + '?' + values, {
        method: "GET",
        headers: Object.assign({
            'Content-Type': 'application/json; charset=utf-8',
            'Accept-Language':appState.lanIndex==0?'zh-cn':appState.lanIndex==1?'ko':'en'
        }, headers),
    }).then(res => {
        let header = res.headers.map
      //  let aa = header.content-type
       //let contenttype = header['content-type']
        let Authorization = header['Authorization']
        if(!Authorization){
            Authorization = header['authorization']
        }
        if (Authorization){
            Authorization = Authorization.replace('Bearer ','')
            autoLogin(Authorization)
        }
        return res.text()
    }).then(text => {
        console.log(text);
        let res = JSON.parse(text.trim());
        if (res.code == 401) {
            setToken(null, null)
            // setToken(null,null)
        }
        return res
    }).catch((e)=>{
        if(process.env.NODE_ENV !== 'production' ){
            console.log("=========err get:"+url)
        }
    })
}

async function http_delete(url, params, headers) {
    console.log(url, params)
    let values = toQueryString(Object.assign({}, params))
    console.log('values'+values)
    return fetch(url + '?' + values, {
        method: "DELETE",
        headers: Object.assign({
            'Content-Type': 'application/json; charset=utf-8',
            'Accept-Language':appState.lanIndex==0?'zh-cn':appState.lanIndex==1?'ko':'en'
        }, headers),
    }).then(res => {
        let header = res.headers.map
        //  let aa = header.content-type
        //let contenttype = header['content-type']
        let Authorization = header['Authorization']
        if(!Authorization){
            Authorization = header['authorization']
        }
        if (Authorization){
            Authorization = Authorization.replace('Bearer ','')
            autoLogin(Authorization)
        }
        return res.text()
    }).then(text => {
        console.log(text);
        let res = JSON.parse(text.trim());
        if (res.code == 401) {
            setToken(null, null)
            // setToken(null,null)
        }
        return res
    }).catch((e)=>{
        if(process.env.NODE_ENV !== 'production' ){
            console.log("=========err get:"+url)
        }
    })
}



export {appState,
    register,
    logout,
    sendMsg,
    login,
    forgetPwd,
    changePassword,
    setToken,
    setTradeToken,
    walletAddress,
    indexNotices,
    indexIndex,
    workDetail,
    questionsCode,
    scoreToken,
    changeTraPassword,
    changeMobile,
    miningPoolIndex,
    transferInto,
    transferRecord,
    miningPoolComputingPower,
    miningPoolQinfeng,
    miningPoolIcePower,
    miningPoolInvite,
    netRedFundTransferInto,
    netRedFundLog,
    netRedFundTransferOutView,
    netRedFundTransferOutToWallet,
    netRedFundRenewal,
    incomeDetails,
    collisionCollide,
    collisionLog,
    collisionTransaction,
    collisionBtcPage,
    walletTotalAssetValuation,
    walletTransactionRecord,
    walletTransferPageData,
    walletTransferFee,
    walletTransferOnChain,
    walletInternalTransfer,
    walletTransferDetail,
    userCodeLogin,
    userInvitationLink,
    myFeedBack,
    autoLogin,
    versionIndex,
    transferOut,
    promoteComputingPowerDistribution,
    miningPoolTransferIntoView,
    miningPoolTransferOutView,
    miningPoolIntroduction,
    incomeLogs,
    nodeUserNotice,
    userUsernameUpdate,
    updateName,
    userInfo,
    mnemonicIndex,
    mnemonicCheck,
    mnemonicBackUp,
    checkPayPassword,
    mnemonicLogin,
    privateKeyLogin,
    walletCheckUser,
    projectDetailIndex,
    tradePairAll,
    assetCapital,
    accountUserLogin,
    loadLan,
    saveLanIndex,
    tradeSpotHistory,
    tradeUsdkOrder,
    verifyTradePassword,
    tradeUsdkDelOrder,
    miningList,
    miningLock,
    miningNotExpiredList,
    miningAllList
}
