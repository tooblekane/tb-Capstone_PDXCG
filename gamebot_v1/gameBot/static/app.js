const app = Vue.createApp({
    delimiters: ['[[', ']]'],
    data(){
        return{
            csrfToken: '',
            key: '5f251131a8a34cdd8d63feb4f69c4669',
            search: 'Grand Theft Auto V'
        }
    },
    methods: {
        getsales(){
            axios({
                url: `https://api.rawg.io/api/games?key=${this.key}&search=${this.search}`,
                method: 'GET',
            })
            .then(response => {
                this.sales = response.data
                // console.log(this.sales['results'][0]['id'])
                console.log(response.data)
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created: function() {
        this.getsales()
    },
    mounted(){
        this.csrfToken = document.querySelector("input[name=csrfmiddlewaretoken]").value
    }
})


