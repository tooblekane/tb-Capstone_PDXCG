const app = Vue.createApp({
    delimiters: ['[[', ']]'],
    data(){
        return{
            csrfToken: '',
            key: '5f251131a8a34cdd8d63feb4f69c4669',
            game_search: '',
            game_info: '',
            searchInput: '',
            slug: '',
            genres: [],
            searching: 0,
            background_image: '',
            backgroundColor: 'blue',
            gameID: 0,
            steamID: 0,
            currentUser: {},
            current_game: {},
            current_screenshots: {},
            current_screenshot: '',
            current_stores: {},
            current_prices: {},
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
                // console.log(urltest)
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
                // console.log(response.data)
                this.current_game = response.data
                this.genres = this.current_game['genres']
                this.background_image = this.current_game['background_image']
                this.slug = this.current_game['slug']
                console.log(this.slug)
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
                this.current_stores = response.data.results
                // console.log(this.current_stores)
                for (let i = 0; i < this.current_stores.length; i++) {
                    if (this.current_stores[i].store_id === 1){
                        // console.log(this.current_stores[i].url)
                        // this.steamID = this.current_stores[i].url.split(/\//)[4]
                        // console.log('Steam ID: ' + this.steamID)
                        this.getGamePrice()
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
        },

        getGamePrice(){
            // Wednesday---- Do this in 2 parts: Search with slug, then run a loop getting matching name and steamID (check Portal 2 to see if this works).
            // Get dealID from that, then pull exact pricing info
            axios({
                // url: `https://www.cheapshark.com/api/1.0/deals?storeID=1&steamAppID=${this.steamID}`,
                url: `https://www.cheapshark.com/api/1.0/deals?storeID=1&title=${this.slug}`,
                method: 'GET',
            })
            .then(response => {
                // console.log(url)
                this.current_prices = response.data[0]
                console.log(this.current_prices)
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