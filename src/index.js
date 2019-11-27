import ApolloClient, {gql} from 'apollo-boost'

const uri = process.env.GRAPHQL_BLOG_API_URL + "/graphql"
const client = new ApolloClient({uri})

const query = gql`
    query {
        users {
            id name
        }
        posts {
            id title author { name }
        }
    }
`

client.query({query}).then(response => {
    let html = ''

    response.data.users.forEach((user) => {
        html += `
            <div>
                ${user.name}
            </div>
        `
    })

    document.getElementById('users').innerHTML = html

    html = ''
    response.data.posts.forEach((post) => {
        html += `
            <div>
                <div>
                    Title: ${post.title}, Author: ${post.author.name}
                </div>
            </div>
        `
    })
    document.getElementById('posts').innerHTML = html

})

