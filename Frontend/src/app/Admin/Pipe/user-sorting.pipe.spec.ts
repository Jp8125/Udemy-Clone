import { UserSortingPipe } from './user-sorting.pipe';

describe('UserSortingPipe', () => {
  it('create an instance', () => {
    const pipe = new UserSortingPipe();
    expect(pipe).toBeTruthy();
  });
});
