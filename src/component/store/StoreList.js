import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class StoreList extends Component {
    render() {
        return (
            <section className="stores">
            {
                this.props.stores.map(store =>
                    <div key={store.id}>
                        {store.name}
                        <Link className="nav-link" to={`/stores/${store.id}`}>Details</Link>
                    </div>
                )
            }
            </section>
        )
    }
}