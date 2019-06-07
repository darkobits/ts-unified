import readPkgUp from 'read-pkg-up';
import resolvePkg from 'resolve-pkg';
import {requireBin} from './utils';


jest.mock('resolve-pkg', () => {
  return jest.fn((pkgName: string) => {
    if (pkgName === 'pkg-with-named-bin') {
      return '/path/to/pkg-with-named-bin';
    }

    if (pkgName === 'pkg-with-no-bin') {
      return '/path/to/pkg-with-no-bin';
    }

    if (pkgName === 'non-existant-pkg') {
      return false;
    }

    throw new Error(`Unknown package name: ${pkgName}`);
  });
});


jest.mock('read-pkg-up', () => {
  return jest.fn(async ({cwd}: {cwd: string}) => {
    if (cwd === '/path/to/pkg-with-named-bin') {
      return {
        package: {
          bin: {
            'pkg-with-named-bin': '/path/to/pkg-with-named-bin/bin'
          }
        },
        path: '/path/to/pkg-with-named-bin'
      };
    }

    if (cwd === '/path/to/pkg-with-no-bin') {
      return {
        package: {},
        path: '/path/to/pkg-with-no-bin'
      };
    }

    if (cwd === '/path/to/non-existant-pkg') {
      return false;
    }

    throw new Error(`Unknown cwd: ${cwd}`);
  });
});


describe('requireBin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when the package defines binaries', () => {
    it('should atempt to require the indicated binary', async () => {
      expect.assertions(3);

      try {
        await requireBin('pkg-with-named-bin');
      } catch (err) {
        expect(err.message).toMatch('Cannot find module');

        // @ts-ignore
        expect(resolvePkg.mock.calls[0][0]).toBe('pkg-with-named-bin');

        // @ts-ignore
        expect(readPkgUp.mock.calls[0][0]).toMatchObject({cwd: '/path/to/pkg-with-named-bin'});
      }
    });
  });

  describe('when the package does not define binaries', () => {
    it('should throw an error', async () => {
      expect.assertions(3);

      try {
        await requireBin('pkg-with-no-bin');
      } catch (err) {
        expect(err.message).toMatch('Package "pkg-with-no-bin" does not declare any binaries.');

        // @ts-ignore
        expect(resolvePkg.mock.calls[0][0]).toBe('pkg-with-no-bin');

        // @ts-ignore
        expect(readPkgUp.mock.calls[0][0]).toMatchObject({cwd: '/path/to/pkg-with-no-bin'});
      }
    });
  });

  describe('when the package does not exist', () => {
    it('should throw an error', async () => {
      expect.assertions(3);

      try {
        await requireBin('non-existant-pkg');
      } catch (err) {
        expect(err.message).toMatch('Unable to resolve path to package "non-existant-pkg".');
        // @ts-ignore
        expect(resolvePkg.mock.calls[0][0]).toBe('non-existant-pkg');
        expect(readPkgUp).not.toHaveBeenCalled();
      }
    });
  });

  describe('when the indicated binary does not exist', () => {
    it('should throw an error', async () => {
      expect.assertions(3);

      try {
        await requireBin('pkg-with-named-bin', 'bad-bin-name');
      } catch (err) {
        expect(err.message).toMatch('Package "pkg-with-named-bin" does not have binary "bad-bin-name".');
        // @ts-ignore
        expect(resolvePkg.mock.calls[0][0]).toBe('pkg-with-named-bin');
        // @ts-ignore
        expect(readPkgUp.mock.calls[0][0]).toMatchObject({cwd: '/path/to/pkg-with-named-bin'});
      }
    });
  });
});
