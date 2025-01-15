<template>
	<div class="login flex mx-10% my-20 w-[calc(100%-20%)] h-[calc(100%-40px)] b-rd-20 overflow-hidden">
		<div class="w-481 bg-white relative">
			<h2 class="flex item-center fw-500 text-28 color-#1f2c51 my-80 w-70% justify-center mx-auto">
				<img src="@/assets/images/logo.png" class="w-auto h-24 mr-6" />
				智能停车管理系统
			</h2>
			<a-form layout="vertical" :model="form" class="!w-70% mx-auto">
				<a-form-item label="账号">
					<a-input placeholder="请输入账号" class="h-40 lh-40 !bg-white !b-rd-8 !b-1 !b-#d8d8d8" />
				</a-form-item>
				<a-form-item label="密码">
					<a-input placeholder="请输入密码" type="password" class="h-40 lh-40 !bg-white !b-rd-8 !b-1 !b-#d8d8d8" />
				</a-form-item>
				<a-form-item class="!mb-10">
					<a-button type="primary" class="w-full !h-40 !lh-40 !b-rd-8" @click="handleLogin"> 登录 </a-button>
				</a-form-item>
				<a-form-item>
					<div class="flex justify-between w-full">
						<a-checkbox value="1">记住密码</a-checkbox>
						<a-checkbox value="1">自动登录</a-checkbox>
						<a-link href="javascript:void(0)" type="primary">忘记密码</a-link>
					</div>
				</a-form-item>
			</a-form>
			<div class="absolute bottom-10 left-0 w-full">
				<p class="text-center">联系我们：<a-link href="javascript:void(0)" type="primary">400-8888-8888</a-link></p>
			</div>
		</div>
		<div class="logo-swapper flex-1">
			<a-carousel class="w-full h-full" :default-current="1" show-arrow="never" auto-play>
				<a-carousel-item v-for="(banner, idx) in banners" :key="idx" class="relative overflow-hidden">
					<img :src="banner.url" class="w-full h-full" />
					<h2 class="absolute top-5% left-0 w-full text-white" :style="banner.titleStyle">{{ banner.title }}</h2>

					<div class="absolute bottom-0 left-0 w-full">
						<p v-for="(subtitle, i) in banner.subTitles" :key="i" :style="subtitle.style" class="text-white">{{ subtitle.title }}</p>
					</div>
				</a-carousel-item>
			</a-carousel>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { banners } from "./const/index";
const form = reactive({
	username: "",
	password: ""
});
const handleLogin = () => {
	console.log(form);
};
</script>
