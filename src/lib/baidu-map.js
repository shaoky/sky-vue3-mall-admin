export function baiduMap(ak = 'O3aiwCPwChwQFcEoXXu0nzuS315TtqW8') {
    return new Promise(function(resolve, reject) {
        window.baiduMap = function() {
            resolve()
        }
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `http://api.map.baidu.com/api?v=3.0&ak=${ak}&callback=baiduMap`
        script.onerror = reject
        document.head.appendChild(script)
    })
}