import React from 'react';

import { storiesOf } from '@storybook/react';
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

const item = {
  name: 'pistol',
  image: '../src/client/game/resources/m9-pistol.jpg'
};

storiesOf('Items', module).add('with 3 pistols', ()=>
  <Items items={[item, item, item]}/>
)

storiesOf('Item', module).add('with pistol', ()=>
  <Item item={{
    name: 'pistol',
    image: '../src/client/game/resources/m9-pistol.jpg'
  }}/>
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



