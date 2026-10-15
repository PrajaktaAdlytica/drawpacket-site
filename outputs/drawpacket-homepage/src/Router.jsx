import App from './App';
import DetailPage from './pages/DetailPage';
import { pages, normalizePath } from './pages/catalog';
export default function Router({path='/'}){const route=normalizePath(path);return route==='/'?<App/>:<DetailPage page={pages[route]||pages['/404']} path={route}/>;}
