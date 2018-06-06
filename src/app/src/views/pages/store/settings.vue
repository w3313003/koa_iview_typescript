<template>
    <div>
        <Upload 
            :action="uploadConfig.action"
            :show-upload-list="false"
        >
            <Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
        </Upload>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import api from "@/api/index";

export default Vue.extend({
    data() {
        return {
            uploadConfig: {
                action:  api.BASE_URL + "/handler/upload"
            }
        }
    }
});
</script>

<style lang="stylus" scoped>
</style>