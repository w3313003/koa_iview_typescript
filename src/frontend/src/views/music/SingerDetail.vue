<template>
    <transition name='slide'>
        <MusicList 
            :title="singerInfo.name"
            :bgImage="singerInfo.avatar"
            :musicList="musicList"
        />
    </transition>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import MusicList from "../../components/music/MusicList.vue";
import api from "../../api/index";
@Component({
    components: {
        MusicList
    }
})
export default class extends Vue {
    created() {
        this._getMusic();
    }
    singerInfo: object = {
        name: '',
        avatar: '',
        id: ''
    };
    musicList: object[] = []

    // methods
    _getMusic() {
        api.post("/music", {
            path: `/artists?id=${this.$route.params.id}`
        }).then(res => {
            {
                const { name, picUrl: avatar, id } = res.data.artist;
                this.singerInfo = {
                    name,
                    avatar,
                    id
                };
            }
            this.musicList = res.data.hotSongs.map((v: any) => {
                const { name: songName, id, al: album } = v;
                return {
                    songName,
                    id,
                    album
                }
            })
        })
    }
}

</script>

<style lang="stylus" scoped>
.slide-enter-active,.slide-leave-active 
    transition all 0.3s
.slide-enter,.slide-leave-to
    transform translate3d(100%,0,0)       

</style>
