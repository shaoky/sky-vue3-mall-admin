import { defineStore } from 'pinia'
export const useStore = defineStore('main', {
    state: () => {
        return {
            user: {} as User
        }
    },
    actions: {
        updateUser(user: User) {
            this.user = user
        }
    }
})

interface User {
    username: string;
}