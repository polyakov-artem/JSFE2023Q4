import { importAll } from './import-all';

importAll(require.context('~svg-sprite', true, /\.svg$/));
