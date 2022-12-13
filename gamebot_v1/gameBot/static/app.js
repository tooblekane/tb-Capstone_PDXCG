const app = Vue.createApp({
    delimiters: ['[[', ']]'],
    data(){
        return{
            csrfToken: '',
            key: '5f251131a8a34cdd8d63feb4f69c4669',
            game_search: '',
            game_info: '',
            searchInput: 'portal 2',
            genres: [],
            searching: 0,
            background_image: '',
            backgroundColor: 'blue',
            gameID: 0,
            currentUser: {},
            current_game: {},
            current_screenshots: {},
            current_screenshot: '',
            current_stores: {},
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
                // console.log(response.data['results'])
                this.game_search = response.data['results']
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
                console.log(response.data)
                this.current_game = response.data
                this.genres = this.current_game['genres']
                this.background_image = this.current_game['background_image']
                this.getScreenshots(this.gameID)
            })
            .catch(err => {
                console.log(err)
            })
        },

        getScreenshots(gameID){
            
            axios({
                url: `https://api.rawg.io/api/games/${this.gameID}/screenshots?key=${this.key}&count=24`,
                method: 'GET',
            })
            .then(response => {
                // console.log(response.data)
                this.current_screenshots = response.data.results
                this.current_screenshot = this.current_screenshots[0].image // move this to the change SS function later and make index a variable
                this.getStores(this.gameID)
            })
            .catch(err => {
                console.log(err)
            })
        },

        getStores(gameID){
            
            axios({
                url: `https://api.rawg.io/api/games/${this.gameID}/stores?key=${this.key}`,
                method: 'GET',
            })
            .then(response => {
                // console.log(response.data)
                this.current_stores = response.data.results
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
            })
        },

    },
    created: function() {
        this.loadCurrentUser()
    },
    mounted(){
        this.csrfToken = document.querySelector("input[name=csrfmiddlewaretoken]").value
    }
})