import { Link, Outlet, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { fetchEvent, deleteEvent, queryClient } from '../../util/http.js'
import { useNavigate } from 'react-router-dom'

import ErrorBlock from '../UI/ErrorBlock.jsx'
import Header from '../Header.jsx'

export default function EventDetails() {
  const navigate = useNavigate()

  const { id } = useParams()
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', id],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
  })

  const { mutate } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
        refetchType: 'none',
      })
      navigate('/events')
    },
  })

  function handleDeleteEvent() {
    mutate({ id })
  }

  const formattedDate = new Date(data?.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <>
      <Outlet />
      <Header>
        <Link to='/events' className='nav-item'>
          View all Events
        </Link>
      </Header>

      {isPending && (
        <div id='event-details-content' className='center'>
          <p>Loading event details...</p>
        </div>
      )}

      {isError && (
        <ErrorBlock
          title='Failed to load event details'
          message={
            error.info?.message ||
            'Failed to load event details. Please try again later'
          }
        />
      )}
      {data && (
        <article id='event-details'>
          <header>
            <h1>{data.title}</h1>
            <nav>
              <button onClick={handleDeleteEvent}>Delete</button>
              <Link to='edit'>Edit</Link>
            </nav>
          </header>
          <div id='event-details-content'>
            <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
            <div id='event-details-info'>
              <div>
                <p id='event-details-location'>{data.location}</p>
                <time dateTime={`Todo-DateT$Todo-Time`}>
                  {formattedDate} @ {data.time}
                </time>
              </div>
              <p id='event-details-description'>{data.description}</p>
            </div>
          </div>
        </article>
      )}
    </>
  )
}
