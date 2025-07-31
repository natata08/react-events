import { Link, Outlet, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { fetchEvent, deleteEvent, queryClient } from '../../util/http.js'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ErrorBlock from '../UI/ErrorBlock.jsx'
import Header from '../Header.jsx'
import Modal from '../UI/Modal.jsx'

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false)
  const navigate = useNavigate()

  const { id } = useParams()
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', id],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
  })

  const {
    mutate,
    isPending: isdPendingDeletion,
    isError: isErrorDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
        refetchType: 'none',
      })
      navigate('/events')
    },
  })

  function handleStartDelete() {
    setIsDeleting(true)
  }

  function handleStopDelete() {
    setIsDeleting(false)
  }

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
      {isDeleting && (
        <Modal onClose={handleStopDelete}>
          <h2>Are you sure?</h2>
          <p>
            Do you really want to delete this event? This action cannot be
            undone.
          </p>
          <div className='form-actions'>
            {isdPendingDeletion && <p>Deleting, please wait...</p>}
            {!isdPendingDeletion && (
              <>
                <button onClick={handleStopDelete} className='button-text'>
                  Cancel
                </button>
                <button onClick={handleDeleteEvent} className='button'>
                  Delete
                </button>
              </>
            )}
          </div>
          {isErrorDeleting && (
            <ErrorBlock
              title='Failed to delete event'
              message={
                deleteError.info?.message ||
                'Failed to delete event, please try again later.'
              }
            />
          )}
        </Modal>
      )}

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
              <button onClick={handleStartDelete}>Delete</button>
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
