import * as React from 'react';
import { Button } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import { Shuffle } from 'src/modules/shuffle';

export class ShuffleButton extends React.Component {
  public render() {
    return (
      <Shuffle>
        {({ shuffle }) =>
          <Button
            icon="shuffle"
            onClick={async () => {
              const result = await shuffle({
                variables: {
                  clientMutationId: uuid(),
                },
              });
              // TODO 플레이 리스트 갱신할것
              console.log(result);
            }}
          />}
      </Shuffle>
    );
  }
}
