import http from 'http';
import { serverVar } from './envvar.js';
import { router } from './router/router.js';

const PORT: number = serverVar.PORT;
const HOST: string = serverVar.HOST;

const server = http.createServer(await router);

server.listen(PORT, HOST, () => {
  console.log(`Server start: http://${HOST}:${PORT}`);
});
