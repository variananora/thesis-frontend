import { render } from '@testing-library/react';
import RegisterPage from './RegisterPage';

describe('RegisterPage', () => {
  it('should render register page properly', () => {
    const component = render(<RegisterPage />);

    const snapshot = component.asFragment();

    expect(snapshot).toMatchSnapshot();
  });
});
