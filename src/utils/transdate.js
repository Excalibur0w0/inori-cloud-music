export const transToShow = (timestamp) => {
    let d = new Date(timestamp);
    return d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日"
}


export const getRightTime = (duration) => {
    let m = Math.floor(duration / 60)
    let s = Math.ceil(duration % 60)
    let mStr = m
    let sStr = s

    if (m / 10 < 1) {
        mStr = "0" + m
    }
    if (s / 10 < 1) {
        sStr = "0" + s
    }

    return mStr + " : " + sStr;
}