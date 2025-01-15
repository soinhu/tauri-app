<script setup lang="ts">
import zhCn from "@arco-design/web-vue/es/locale/lang/zh-cn";
</script>

<template>
	<a-config-provider :locale="zhCn">
		<RouterView />
	</a-config-provider>
</template>
