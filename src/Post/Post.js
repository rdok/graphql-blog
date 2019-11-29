import React from 'react'
import {gql} from 'apollo-boost'

export default class Post extends React.Component {

    apolloClient
    query = gql`
        query {
            posts {
                id title author { name }
            }
        }
    `

    constructor(props) {
        super(props)
        this.apolloClient = props.apolloClient
        this.state = {posts: []}
    }

    componentDidMount() {
        this.apolloClient.query({query: this.query})
            .then((response) => {
                if (!response || !response.data || !response.data.posts) {
                    return
                }
                this.setState({posts: response.data.posts})
            })
    }

    render() {
        const posts = this.state.posts.map(post => (
            <div key={post.id} data-testid={post.id}>
                {post.title}, by {post.author.name}
            </div>
        ))

        return (<div><h3>Posts</h3> {posts} </div>)
    }
}

