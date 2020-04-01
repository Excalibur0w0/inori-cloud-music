

const sourcePathModule = {
    state: {
        requestPath: {
            img: {
                user: "http://10.0.0.11:5333/provider-auth/io/resource/img?imgPath=",
                music: "http://10.0.0.11:5333/provider-music/io/resource/img?imgPath="
            },
            audio: {
                default: "http://10.0.0.11:5333/provider-music/io/resource/audio?md5="
            }
        }
    },
    getters: {
        avatarPath: state => state.requestPath.img.user,
        musicImgPath: state => state.requestPath.img.music,
        audioPath: state => state.requestPath.audio.default
    }
}

export default sourcePathModule