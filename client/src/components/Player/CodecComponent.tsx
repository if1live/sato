import { CodecData } from 'common';
import { Subscription } from 'rxjs';
import * as React from 'react';
import { codecData$ } from 'src/helpers/sse';

interface Props {

}

interface State {
  codec?: CodecData;
  sub?: Subscription;
}
export class CodecComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
    };
  }

  public componentDidMount() {
    // TODO 비동기 괜찮나?
    const sub = codecData$.subscribe((ev) => {
      this.setState({
        codec: ev.codec,
      });
    });

    this.setState({
      sub,
    });
  }

  public componentWillUnmount() {
    const { sub } = this.state;
    if (sub) {
      sub.unsubscribe();
    }
  }

  public render() {
    const { codec } = this.state;
    const details = codec ? codec.audio_details : [];

    return (
      <ul>
        {details.map((el, idx) => <li key={idx}>{el}</li>)}
      </ul>
    );
  }
}
