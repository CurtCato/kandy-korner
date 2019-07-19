import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class CandyList extends Component {
  render() {
    return (
      <section className="candies">
        {this.props.candies.map(candy =>
          <div key={candy.id}>
            {candy.name} of type:{" "}
            {
              this.props.candyTypes.find(
                candyType => candy.candyTypeId === candyType.id
              ).name
            }
            <div className="card-title">
            <Link className="nav-link" to={`/candy/${candy.id}`}>Details</Link>

            </div>
          </div>
        )}
      </section>
    );
  }
}
