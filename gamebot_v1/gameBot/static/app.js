const app = Vue.createApp({
    delimiters: ['[[', ']]'],
    data(){
        return{
            searchInput: 'high on life',

            csrfToken: '',
            key: '5f251131a8a34cdd8d63feb4f69c4669',
            
            gameID: 0,
            steamID: 0,
            searching: 0,
            
            name: '',
            slug: '',
            game_info: '',
            game_search: '',
            background_image: '',
            current_screenshot: '',
            
            genres: {},
            wishlist: {},
            currentUser: {},
            current_game: {},
            current_prices: {},
            current_stores: {},
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
                // console.log(this.game_search)
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
                this.genres = this.current_game['genres']
                this.background_image = this.current_game['background_image']
                this.slug = this.current_game['slug']
                this.name = this.current_game['name'].replace(/\`|\~|\!|\@|\#|\$|\^|\&|\*|\(|\)|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|\d/g, "").toLowerCase()
                this.name = this.name.replace(/\W/g, "%20")
                // console.log(this.gameID, this.current_game['name'])
                this.getScreenshots(this.gameID)
                this.getStores(this.gameID)
            })
            .catch(err => {
                console.log(err)
            })
        },

        getStores(gameID){
            
            axios({
                url: `https://api.rawg.io/api/games/${this.slug}/stores?key=${this.key}`,
                method: 'GET',
            })
            .then(stores_response => {
                // console.log('getStores:')
                // console.log(stores_response.data.results)
                this.current_stores = stores_response.data.results
                for (let i = 0; i < this.current_stores.length; i++) {
                    if (this.current_stores[i].store_id === 1){
                        this.steamID = this.current_stores[i].url.split(/\//)[4]
                        // console.log('Steam ID: ' + this.steamID)
                        this.getGamePrice()
                    }
                }
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
            .then(screenshots_response => {
                // console.log('getScreenshots:')
                // console.log(screenshots_response.data)
                this.current_screenshots = screenshots_response.data.results
                this.current_screenshot = this.current_screenshots[0].image // move this to the change SS function later and make index a variable
                // this.getStores(this.gameID)
            })
            .catch(err => {
                console.log(err)
            })
        },

        getGamePrice(){
            axios({
                url: `https://www.cheapshark.com/api/1.0/deals?storeID=1&title=${this.name}&steamAppID=${this.steamID}`,
                method: 'GET',
            })
            .then(price_response => {
                // console.log(price_response.data[0])
                this.current_prices = price_response.data[0]
            })
            .catch(err => {
                console.log(err)
            })
        },

        loadCurrentUser(){
            axios({
                method: 'get',
                url: '/users/currentuser/'
            }).then(user_response => {
                this.currentUser = user_response.data
                // console.log('current user id: ', this.currentUser.id)
            })
        },

        addToWishlist(id){
            axios({
                method: 'post',
                url: '/api/wishlist/',
                headers: {'X-CSRFToken': this.csrfToken},
                data: {
                    "wishlist_owner" : this.currentUser.id,
                    "wishlist_game_name": this.current_game.name,
                    "wishlist_game_steamID": this.steamID,
                }})
                .then(response => {
                    console.log('game added')
                    this.loadCurrentUserWishlist()
                    }).catch(error => {
                    console.log(error.response)
                })
            },

        removeFromWishlist(id){
            axios.delete('/api/wishlist/' + id, {headers: {'X-CSRFToken': this.csrfToken}})
                .then(response => {
                // console.log('game removed')
                this.loadCurrentUserWishlist()
            }).catch(error => {
                console.log(error.response)
            })
        },

        loadCurrentUserWishlist(){
            axios({
                method: 'get',
                url: '/api/wishlist/'
            }).then(response => {
                this.wishlist = response.data
                this.wishlist = this.wishlist.filter(owner => owner.wishlist_owner === this.currentUser.id)
                // console.log('wishlist: ')
                console.log(this.wishlist)
            })
        },

    },
    created: function() {
        this.loadCurrentUser()
        this.loadCurrentUserWishlist()
    },
    mounted(){
        this.csrfToken = document.querySelector("input[name=csrfmiddlewaretoken]").value
    }
})