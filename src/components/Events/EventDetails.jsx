import { Link, Outlet, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'
import { fetchEvent } from '../../util/http.js';

import ErrorBlock from '../UI/ErrorBlock.jsx'
import Header from '../Header.jsx';

export default function EventDetails() {
  const { id } = useParams();
  console.log('id', id)
    const { data, isLoading, isError, error } = useQuery({
      queryKey: ['event'],
      queryFn: () => fetchEvent({ id }),
    })

  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {isLoading && <p>Loading event details...</p>}
      {isError && <ErrorBlock title="Failed to load event details" message={error.info?.message || 'Please try again later'} />}
      {data && (<article id="event-details">
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt="" />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>{data.date}</time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </article>)}
      
    </>
  );
}
