export const Loger = {

    onLog: (type, data) => {
        if (__DEV__)
            console.log(type + "-------->", data)
    },
    onServerLog(type, url, data) {

        if (__DEV__) {
            type == "Req" ?
                console.log("----" + url, "----- request ----->", JSON.stringify(data))
                :
                console.log("+++++" + url, "+++++ response +++++>", JSON.stringify(data))
        }
    }
}









