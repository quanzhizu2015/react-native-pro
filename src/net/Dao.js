//import {setToken} from '../comm/sdk';


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
    }

    return fetch(url, {
        method: "POST",
        headers: Object.assign(header, headers),
        body: JSON.stringify(Object.assign({}, params))
    }).then(res => {
        // console.log('lch--header---', header, url, params)
        // setCookie(res)
        // return res.json()
        // return JSON.parse(res.text().substr(1))
        return res.text()
    }).then(text => {
        let res = JSON.parse(text.trim());
        if (res.code == 422) {
           // setToken(null, null)

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
        //'Content-Type': 'application/json; charset=utf-8',

    }

    return fetch(url, {
        method: "POST",
        headers: Object.assign(header, headers),
        body: formdata
    }).then(res => {
        // console.log('lch--header---', header, url, params)
        // setCookie(res)
        // return res.json()
        // return JSON.parse(res.text().substr(1))
        return res.text()
    }).then(text => {
        let res = JSON.parse(text.trim());
        if (res.code == "401") {
            //setToken(null, null)
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
            'Content-Type': 'application/json; charset=utf-8'
        }, headers),
    }).then(res => {
        return res.text()
    }).then(text => {
        console.log(text);
        let res = JSON.parse(text.trim());
        if (res.code == 422) {
            //setToken(null, null)
           // setToken(null,null)
        }
        return res
    }).catch((e)=>{
        if(process.env.NODE_ENV !== 'production' ){
            console.log("=========err get:"+url)
        }
    })
}


export {
    http_post,
    http_get,
    http_postForm
}
