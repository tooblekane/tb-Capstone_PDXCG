const app = Vue.createApp({
    delimiters: ['[[', ']]'],
    data(){
        return{
            message: '-game 1',
            csrfToken: '',
        }
    },
    methods: {
        loadGames(){
            console.log("sup")
            // axios({
            //     method: 'get',
            //     url: 'api/v1/books'
            // }).then(response => {
            //     this.books = response.data
            //     console.log(response.data)
            //     }
            // )
        },
    },
    created: function() {
        this.loadGames()
    },
    mounted(){
        this.csrfToken = document.querySelector("input[name=csrfmiddlewaretoken]").value
    }
})

