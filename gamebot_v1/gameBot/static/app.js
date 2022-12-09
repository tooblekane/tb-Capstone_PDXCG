const app = Vue.createApp({
    delimiters: ['[[', ']]'],
    data(){
        return{
            csrfToken: '',
            key: '5f251131a8a34cdd8d63feb4f69c4669',
            currentUser: {},
            game_search: '',
            game_info: '',
            searchInput: '',
            gameID: 0,
            name: '',
            description: '',
            genres: [],
            storeid: 1,
            tags: [],
            searching: 0,
        }
    },
    methods: {
        getGameInfo(gameID){
            this.searching = 0
            this.gameID = gameID
            axios({
                url: `https://api.rawg.io/api/games/${this.gameID}?key=${this.key}`,
                method: 'GET',
            })
            .then(response => {
                console.log(response.data)
                this.game_info = response.data
                this.name = this.game_info['name']
                this.genres = this.game_info['genres']
                this.description = this.game_info['description']
                this.tags = this.game_info['tags']
                // console.log(this.gameInfo['results'][0]['id'])
                // console.log(response.data['results'])
            })
            .catch(err => {
                console.log(err)
            })
        },

        gameSearch(){
            axios({
                // url: `https://api.rawg.io/api/games/5679?key=${this.key}`,
                url: `https://api.rawg.io/api/games?key=${this.key}&search=${this.searchInput}`,
                method: 'GET',
            })
            .then(response => {
                this.searching = 1
                this.game_search = response.data['results']
                // console.log(this.game_search[2].name)
                // console.log(this.game_search[2].id)
                // console.log(this.search['results'][0])
                // this.name = this.search['results'][0]['name']
                // this.genres = this.search['results'][0]['genres']
                // console.log(this.name)
                // console.log(this.genres)
                // console.log(response.data['results'])
            })
            .catch(err => {
                console.log(err)
            })
        },

        loadCurrentUser(){
            axios({
                method: 'get',
                url: '../../users/currentuser/'
            }).then(response => {
                this.currentUser = response.data
                // console.log('CU', this.currentUser)
            })
        },

    },
    created: function() {
        this.loadCurrentUser()
        // this.getGameInfo()
        // this.gameSearch()
    },
    mounted(){
        // console.log(this.search_input.value)
        this.csrfToken = document.querySelector("input[name=csrfmiddlewaretoken]").value
    }
})