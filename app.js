import { app, query, errorHandler } from 'mu';

app.get('/', function (req, res) {
  res.send('Hello from count-service');
});

app.get('/count', async function (req, res) {
  const resp = await query(`
    SELECT (COUNT(*) AS ?triples) WHERE {
      GRAPH <http://mu.semte.ch/graphs/public> {
        ?s ?p ?o. } }
  `);
  res.send(JSON.stringify(resp));
});

app.use(errorHandler);
