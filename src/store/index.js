import { defineStore } from 'pinia'
export const useStore = defineStore('main', {
    state: () => {
        return {
            user: {}
        }
    },
    actions: {
        updateUser(user) {
            this.user = user
        }
    }
})