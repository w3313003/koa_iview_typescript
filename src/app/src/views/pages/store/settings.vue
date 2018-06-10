<template>
    <div>
        <Upload 
            :action="uploadConfig.action"
            :show-upload-list="false"
            :name="uploadConfig.name"
            :on-success="successHandler"
            :on-error="error"
            :on-progress="progress"
        >
            <Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
        </Upload>
        <img :src="returnPath"/>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import api from "@/api/index";

export default Vue.extend({
    data() {
        return {
            uploadConfig: {
                action:  api.BASE_URL + "/handler/upload",
                name: "files"
            },
            returnPath: ""
        }
    },
    methods: {
        successHandler(data: any) {
            console.log(data);
            if(data.code === 0) {
                this.returnPath = `http://localhost:3000${data.data.path}`
            }
        },
        error(e: any) {
        },
        progress(a: any, b: any, c: any) {
            console.log(a,b,c)
        }
    }
});
</script>

<style lang="stylus" scoped>
</style>