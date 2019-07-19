import React, { Component } from "react"


export default class Candy extends Component {
    state = {
        saveDisabled: false
    }

    render() {
        return (
            <section className="candy">
                <div key={ this.props.candy.id } className="card">
                    <div className="card-body">
                        <h4 className="card-title">
                            { this.props.candy.name }
                        </h4>
                        <h6 className="card-title">{ this.props.candy.name }</h6>
                        <button onClick={
                                () => {
                                    this.setState(
                                        { saveDisabled: true },
                                        () => this.props.deleteCandy(this.props.candy.id)
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