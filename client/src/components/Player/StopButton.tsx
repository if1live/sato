import { StopAudio } from 'src/modules/stopAudio';
import { Button } from 'semantic-ui-react';
import * as React from 'react';
import { v4 as uuid } from 'uuid';

export class StopButton extends React.PureComponent {
  public render() {
    return (
      <StopAudio>
        {({ stopAudio }) =>
          <Button
            icon="stop"
            secondary
            onClick={async () => {
              const result = await stopAudio({
                variables: {
                  clientMutationId: uuid(),
                },
              });
              console.log(result);
            }}
          />}
      </StopAudio>
    );
  }
}
