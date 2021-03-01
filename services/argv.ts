const argv = process.argv;

export const getArgv = function (arg: string): string | boolean {
  let argument: string;
  const data = argv.filter(filter => {
    argument = filter.split('=')[0];

    if (argument && argument === arg) {
      return true;
    }

    return false;
  })[0];

  return data ? data.split('=')[1] : false;
};
