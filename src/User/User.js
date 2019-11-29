import React from 'react'
import {gql} from 'apollo-boost'

export default class User extends React.Component {

    apolloClient
    query = gql`
        query {
            users {
                id name
            }
        }
    `

    constructor(props) {
        super(props)
        this.apolloClient = props.apolloClient
        this.state = {users: []}
    }

    componentDidMount() {
        this.apolloClient.query({query: this.query}).then((response) => {
            if (!response || !response.data || !response.data.users) {
                const error = `Expected response structure: data.users. `
                    + `Actual: ${JSON.stringify(response)}`
                throw Error(error)
            }
            this.setState({users: response.data.users})
        })
    }

    render() {
        const users = this.state.users.map(user => (
            <div key={user.id} data-testid={user.id}>{user.name}</div>
        ))

        return (<div><h3>Users</h3> {users} </div>)
    }
}

