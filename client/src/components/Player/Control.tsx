import * as React from 'react';
import { Button } from 'semantic-ui-react';
import { PlayButton } from './PlayButton';
import { StopButton } from './StopButton';
import { ShuffleButton } from './ShuffleButton';
import { ForwardButton } from './ForwardButton';
import { BackwardButton } from './BackwardButton';
import { SyncButton } from './SyncButton';

export class ControlComponent extends React.Component {
  public render() {
    return (
      <div>
        <Button.Group icon widths="6">
          <ShuffleButton />
          <BackwardButton />
          <PlayButton />
          {/* TODO pause 필요할까?*/}
          <StopButton />
          <ForwardButton />
          <SyncButton />
        </Button.Group>
      </div>
    );
  }
}
