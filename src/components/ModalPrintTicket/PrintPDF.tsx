import { Component } from 'react';

export class PrintPDF extends Component {
  render() {
    const { children } = this.props;
    return <>{children}</>;
  }
}
