import * as React from 'react';
import { Button } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import { PlayAudio } from 'src/modules/audio/playAudio';
import { StopAudio } from 'src/modules/audio/stopAudio';

export class ControlComponent extends React.Component {
  private onRandom = () => {
    console.log('random');
  }

  public render() {
    return (
      <div>
        <PlayAudio>
          {({ playAudio }) => <Button onClick={async () => {
            const videoId = 'WNk6tpHXpw4';
            const result = await playAudio({
              variables: {
                clientMutationId: uuid(),
                videoId,
              },
            });
            console.log(result);
          }}>play</Button>}
        </PlayAudio>

        <StopAudio>
          {({ stopAudio }) => <Button onClick={async () => {
            const result = await stopAudio({
              variables: {
                clientMutationId: uuid(),
              },
            });
            console.log(result);
          }}>
            stop
          </Button>}
        </StopAudio>

        <Button onClick={this.onRandom}>random</Button>
      </div>
    );
  }
}
