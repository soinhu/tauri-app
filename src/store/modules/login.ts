import { defineStore } from "pinia";
import { getLocal } from "@/utils/storage";
import type { accountInfoType } from "@/types/accountInfo";
type loginState = {
	accountInfo: accountInfoType | null;
	token: string;
};
export const useLoginStore = defineStore("login", {
	state: (): loginState => {
		return {
			accountInfo: null,
			token: getLocal("token")
		};
	},
	actions: {
		setAccountInfo(accountInfo: accountInfoType) {
			this.accountInfo = accountInfo;
		},
		setToken(token: string) {
			this.token = token;
		}
	},
	getters: {
		getAccountInfo: (state) => state.accountInfo,
		getToken: (state) => state.token
	},
	persist: true
});
