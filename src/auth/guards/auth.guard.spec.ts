import { AuthGuard } from './auth.guard';

describe('GuardsGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuard()).toBeDefined();
  });
});
