import DeviceInfo from 'react-native-device-info';
import NetInfo from "@react-native-community/netinfo";
let version = DeviceInfo.getVersion()
let NetworkState = ""

//获知设备联网或离线的状态信息
NetInfo.fetch().done((state) => {
    NetworkState = state.type
});

let UDID = DeviceInfo.getUniqueId()
let ChannelId = '1'
let AcceptLanguage = 'zh-Hans'
let Timestamp = new Date().valueOf()
let Platform = Platform.OS == 'android'?'2':'1'  //分为iOS1，Android2，PC 3
let APIVersion = '1.0'
let UserAgent = DeviceInfo.getDeviceId()


function getHeaders(){
    return {
        'Version':version,
        'Network-State':NetworkState,
        'UDID':UDID,
        'Channel-Id':ChannelId,
        //'Accept-Language':AcceptLanguage,
        'Timestamp':Timestamp,
        'Platform':Platform,
        'API-Version':APIVersion,
        'User-Agent':UserAgent
    }
}
export {getHeaders}
