import * as React from 'react';
import { progress$ } from 'src/helpers/sse';
import { Progress } from 'common';
import { Subscription } from 'rxjs';

interface Props {
}

interface State {
  progress?: Progress;
  sub?: Subscription;
}

export class ProgressBarComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
    };
  }

  public componentDidMount() {
    // TODO 비동기 괜찮나?
    const sub = progress$.subscribe((ev) => {
      this.setState({
        progress: ev.progress,
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
    const { progress } = this.state;

    const percent = progress ? progress.percent : 0;
    const timemark = progress ? progress.timemark : '00:00.00';

    return (
      <ul>
        <li>{percent}</li>
        <li>{timemark}</li>
      </ul>
    );
  }
}
