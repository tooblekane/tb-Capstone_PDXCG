const app = Vue.createApp({
    delimiters: ['[[', ']]'],
    data(){
        return{
            csrfToken: '',
            key: '5f251131a8a34cdd8d63feb4f69c4669',
            currentUser: {},
        }
    },
    methods: {
        get_game_info(){
            axios({
                url: `https://api.rawg.io/api/games?key=${this.key}`,
                method: 'GET',
            })
            .then(response => {
                this.sales = response.data
                // console.log(this.sales['results'][0]['id'])
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
        }
    },
    created: function() {
        // this.get_game_info()
        this.loadCurrentUser()
    },
    mounted(){
        this.csrfToken = document.querySelector("input[name=csrfmiddlewaretoken]").value
    }
})