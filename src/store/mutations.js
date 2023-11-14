const mutations = {
    updatedUser(state, user) {
        state.user = user;
    },
    updateNoticeData(state,payload){
        state.noticeData = payload;
    }
}

export default mutations;
