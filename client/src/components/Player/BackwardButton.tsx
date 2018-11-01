import { Button, Icon } from 'semantic-ui-react';
import * as React from 'react';

export class BackwardButton extends React.PureComponent {
  public render() {
    return (
      <Button icon><Icon name="backward" /></Button>
    );
  }
}

