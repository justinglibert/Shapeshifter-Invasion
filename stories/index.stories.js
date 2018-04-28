import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import Card from '../src/client/game/components/ui/card';
import Player from '../src/client/game/components/ui/player';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);


storiesOf('Card', module).add('with random children', ()=>
  <Card><p>Hey</p></Card>
)

storiesOf('Player', module).add('with random name', ()=>
  <Player player={{
    name: 'Jay'
  }}/>
)