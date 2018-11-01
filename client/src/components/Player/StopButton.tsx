import { StopAudio } from 'src/modules/stopAudio';
import { Button, Icon } from 'semantic-ui-react';
import * as React from 'react';
import { v4 as uuid } from 'uuid';

export class StopButton extends React.PureComponent {
  public render() {
    return (
      <StopAudio>
        {({ stopAudio }) =>
          <Button
            icon
            onClick={async () => {
              const result = await stopAudio({
                variables: {
                  clientMutationId: uuid(),
                },
              });
              console.log(result);
            }}>
            <Icon name="stop" />
          </Button>}
      </StopAudio>
    );
  }
}
