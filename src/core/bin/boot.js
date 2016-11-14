export const development = async (server, type) => {
  try {
    if (type === 'setup') {
      console.log('===> migration DOWN');
      await server.database.migration('down', server.database.optionsMigration);
    }

    console.log('===> migration UP');
    await server.database.migration('up', server.database.optionsMigration);

    if (type === 'setup') {
      console.log('===> seed DOWN');
      await server.database.seed('down', server.database.optionsSeed);
    }

    console.log('===> seed UP');
    const context = await server.database.seed('up', server.database.optionsSeed);

    if (type === 'setup') {
      console.log('===> load fixtures');
      await server.database.fixtures(server.database);
    }
    return context;
  } catch (err) {
    throw err;
  }
};

export const test = async (server) => {
  try {
    console.log('===> migration DOWN');
    await server.database.migration('down', server.database.optionsMigration);

    console.log('===> migration UP');
    await server.database.migration('up', server.database.optionsMigration);

    console.log('===> seed DOWN');
    await server.database.seed('down', server.database.optionsSeed);

    console.log('===> seed UP');
    await server.database.seed('up', server.database.optionsSeed);

    console.log('===> load fixtures');
    return await server.database.fixtures(server.database);
  } catch (err) {
    throw err;
  }
};

export const sandbox = async (server) => {
  try {
    console.log('===> migration UP');
    await server.database.migration('up', server.database.optionsMigration);

    console.log('===> seed UP');
    return await server.database.seed('up', server.database.optionsSeed);
  } catch (err) {
    throw err;
  }
};

export const production = async (server) => {
  try {
    console.log('===> migration UP');
    await server.database.migration('up', server.database.optionsMigration);

    console.log('===> seed UP');
    return await server.database.seed('up', server.database.optionsSeed);
  } catch (err) {
    throw err;
  }
};
