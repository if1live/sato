import { PlayAudio } from 'src/modules/playAudio';
import * as React from 'react';
import { v4 as uuid } from 'uuid';
import { Button, Icon } from 'semantic-ui-react';

export class PlayButton extends React.PureComponent {
  public render() {
    return (
      <PlayAudio>
        {({ playAudio }) =>
          <Button
            icon
            primary
            onClick={async () => {
              // TODO 마지막 재생지점은 서버가 기억하는게 나을거같다
              const videoId = 'WNk6tpHXpw4';
              const result = await playAudio({
                variables: {
                  clientMutationId: uuid(),
                  videoId,
                },
              });
              console.log(result);
            }}>
            <Icon name="play" />
          </Button>}
      </PlayAudio>
    );
  }
}
