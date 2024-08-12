import { sites } from './sites';
import { Site } from './components/Site';
import './app.css';


export function App() {
  




  return (
    <section class="container">
      {sites.map((site) => {
        return (
          <section key={site.id}>
           <Site title={site.title} description={site.description} IMGs={site.IMGs}/>
          </section>
        );
      })}
    </section>
  );
}
