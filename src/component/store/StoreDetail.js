import React, { Component } from "react"


export default class Store extends Component {
    state = {
        saveDisabled: false
    }

    render() {
        return (
            <section className="store">
                <div key={ this.props.store.id } className="card">
                    <div className="card-body">
                        <h4 className="card-title">
                            { this.props.store.name }
                        </h4>
                        <h6 className="card-title">{ this.props.store.address }</h6>
                        <button onClick={
                                () => {
                                    this.setState(
                                        { saveDisabled: true },
                                        () => this.props.deleteStore(this.props.store.id)
                                    )
                                }
                            }
                            disabled={ this.state.saveDisabled }
                            className="card-link">Delete</button>
                    </div>
                </div>
            </section>
        )
    }
}