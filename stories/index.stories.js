import React from 'react';

import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import Card from '../src/client/game/components/ui/card';
import Player from '../src/client/game/components/ui/player';
import Item from '../src/client/game/components/ui/item';
import Items from '../src/client/game/components/ui/items';
import Players from '../src/client/game/components/ui/players';
import Status from '../src/client/game/components/ui/status';
import ShipStatus from '../src/client/game/components/ui/shipStatus';
import Problem from '../src/client/game/components/ui/problem';
import Problems from '../src/client/game/components/ui/problems';
import Proposition from '../src/client/game/components/ui/proposition';
import Propositions from '../src/client/game/components/ui/propositions';
import Choice from '../src/client/game/components/ui/choice';
import ItemOption from '../src/client/game/components/ui/itemOption';
import ItemOptions from '../src/client/game/components/ui/itemOptions';

import '../src/client/index.scss';

addDecorator(fn => <div className="pt-dark">{fn()}</div>)

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);


storiesOf('Card', module).add('with random children', ()=>
  <Card><p>Hey</p></Card>
);

storiesOf('Card', module).add('with no text', ()=>
  <Card><p/></Card>
)


const player1 = {
  id: 0,
  name: 'Robin'
};
const player2 = {
  id: 1,
  name: 'Jay'
};
const players = [player1, player2];

storiesOf('Player', module).add('with random name', ()=>
  <Player player={player1}/>
)

storiesOf('Players', module).add('with two players', () => 
  <Players players = {players}/>
)

const pistol = {
  name: 'Pistol',
  image: '../src/client/game/resources/m9-pistol.jpg',
  description: 'A simple pistol that deals damage.'
};

const screwdriver = {
  name: 'Screwdriver',
  image: '',
  description: 'A trusty tool that fixes the engine'
}

storiesOf('Items', module).add('with 3 pistols', ()=>
  <Items items={[pistol, screwdriverl]}/>
)

storiesOf('Item', module).add('with pistol', ()=>
  <Item item={pistol}/>
)

storiesOf('ItemOption', module).add('of pistol', ()=>
  <ItemOption item={pistol}/>
)

storiesOf('ItemOptions', module).add('with pistols', ()=>
  <ItemOptions items={[pistol, screwdriver]}/>
)

const oxygen = {
  name: 'oxygen',
  amount: '5'
}

const water = {
name: 'water',
amount: '7'
}

const ship = {
  problems: [],
  resources: [oxygen, water]
};


storiesOf('Status', module).add('of oxygen', ()=>
  <Status resource={oxygen} decrease={1}/>
)

storiesOf('ShipStatus', module).add('of ship', ()=>
  <ShipStatus ship={ship}/>
)

const problem1 = {
  name: 'Oxygen Leak',
  description: 'Oxygen is leaking!',
  solution: 'Find an oxygen tank',
  affected: 'Oxygen',
  decreaseRate: 10
}

const problem2= {
  name: 'Power cut',
  description: 'The engine room needs the power back.',
  solution: 'Turn power back on.',
  affected: 'Speed',
  decreaseRate: 5
}

const problems = [problem1, problem2]

storiesOf('Problems', module).add('Problems', () => 
  <Problems problems = {problems}/>
)

const prop1 = {
  player: 'Justin',
  description: 'Send Jay to room 8.',
  percentage: 25
}

const prop2 = {
  player: 'Robin',
  description: 'Probe room 2.',
  percentage: 50
}

const propositions = [prop1, prop2]

storiesOf('Propositions', module).add('Propositions', () => 
  <Propositions propositions = {propositions}/>
)

// playersNames = ['Jay', 'Justin', 'Qais', 'Robin']
// rooms = ['room1', 'room2', 'room3', 'room4']

// const choice1 = {
//   dropSendWho: playersNames,
//   dropSendDestination: rooms,
//   dropThrowWho: playersNames,
//   dropFix: 'oxygen leak'
// }

// storiesOf('Choice', module).add('Choice', () =>
//   <Choice choice = {choice1}/>
// )