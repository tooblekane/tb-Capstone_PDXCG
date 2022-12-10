const app = Vue.createApp({
    delimiters: ['[[', ']]'],
    data(){
        return{
            csrfToken: '',
            key: '5f251131a8a34cdd8d63feb4f69c4669',
            currentUser: {},
            game_search: '',
            game_info: '',
            searchInput: 'portal 2',
            name: '',
            description: '',
            genres: [],
            storeid: 1,
            searching: 0,
            background_image: '',
            backgroundColor: 'blue',
            gameID: 0,
            current_game: {},
            current_screenshots: {},
        }
    },
    methods: {
        gameSearch(){
            axios({
                url: `https://api.rawg.io/api/games?key=${this.key}&search=${this.searchInput}`,
                method: 'GET',
            })
            .then(response => {
                this.searching = 1
                this.game_search = response.data['results']
                // console.log(this.game_search[0])
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
        
        getGameInfo(gameID){
            this.searching = 2
            this.gameID = gameID
            axios({
                url: `https://api.rawg.io/api/games/${this.gameID}?key=${this.key}`,
                method: 'GET',
            })
            .then(response => {
                this.current_game = response.data
                // console.log(this.current_game)
                this.name = this.current_game['name']
                this.genres = this.current_game['genres']
                this.description = this.current_game['description_raw']
                this.background_image = this.current_game['background_image']
                this.getScreenshots(this.gameID)
            })
            .catch(err => {
                console.log(err)
            })
        },

        getScreenshots(gameID){
            
            axios({
                url: `https://api.rawg.io/api/games/${this.gameID}/screenshots?key=${this.key}`,
                method: 'GET',
            })
            .then(response => {
                this.current_screenshots = response.data
                this.current_game = Object.assign(this.current_game, this.current_screenshots)
                console.log(this.current_game)
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