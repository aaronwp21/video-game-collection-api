module.exports = function (app) {
  const apiRoot = '/api/';
  const version = 'v1';
  const fullAPIRoot = apiRoot + version;

  app.use(`${fullAPIRoot}/games`, require('./games.routes'));

  app.all('*', (req, res) => {
    res.sendStatus(404);
  });
};
