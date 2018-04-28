/*
 * Copyright 2018 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import PropTypes from 'prop-types';
class Board extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool,
    isConnected: PropTypes.bool,
  };

  constructor(props) {
    super(props);
  }

  state = {
    selected: '',
  };


  render() {
    let disconnected = null;
    if (this.props.isMultiplayer && !this.props.isConnected) {
      disconnected = <p>Disconnected!</p>;
    }
    return (
      <div>
        {disconnected}
      </div>
    );
  }
}

export default Board;
