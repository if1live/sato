import * as React from 'react';
import { Button, Icon } from 'semantic-ui-react';

export class ForwardButton extends React.PureComponent {
  public render() {
    return (
      <Button icon><Icon name="forward" /></Button>
    );
  }
}
