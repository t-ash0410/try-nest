import { useMutation, useQuery } from '@apollo/client/index'
import { useState } from 'react'
import { gql } from '~/__generated__'
import { Button, TableSkeleton } from '~/components'
import { formatDate } from '~/util/date'
import { handleError } from '~/util/handle-error'
import { DeleteButton } from '../delete-button'
import { EditableDateTimeField, EditableTextField } from '../editable-field'
import { TicketForm } from '../ticket-form'

const GET_TICKETS = gql(`
  query GetTickets {
    getTickets {
      ticketId
      title
      description
      deadline
      createdAt
      updatedAt
    }
  }
`)

const CREATE_TICKET = gql(`
  mutation CreateTicket($title: String! $deadline: DateTime $description: String) {
    create(input: {
      title: $title
      description: $description
      deadline: $deadline
    }) {
      ticketId
      title
      description
      deadline
      createdAt
      updatedAt
    }
  }
`)

const UPDATE_TICKET = gql(`
  mutation UpdateTicket($ticketId: Int! $title: String $deadline: DateTime $description: String) {
    update(input: {
      ticketId: $ticketId
      title: $title
      description: $description
      deadline: $deadline
    }) {
      ticketId
      title
      description
      deadline
      createdAt
      updatedAt
    }
  }
`)

const DELETE_TICKET = gql(`
  mutation DeleteTicket($ticketId: Int!) {
    delete(input: {
      ticketId: $ticketId
    }) {
      ticketId
      title
      description
      deadline
      createdAt
      updatedAt
    }
  }
`)

export const TicketList = () => {
  const { data, loading, error, refetch } = useQuery(GET_TICKETS)

  // Create
  const [isCreating, setIsCreating] = useState(false)
  const [createTicket] = useMutation(CREATE_TICKET)

  // Update
  const [updateTicket] = useMutation(UPDATE_TICKET)

  // Delete
  const [deleteTicket] = useMutation(DELETE_TICKET)

  if (error) {
    handleError(error)
    return
  }
  return (
    <div className="space-y-4">
      <div className="mb-4">
        {isCreating ? (
          <TicketForm
            onSubmit={async (t) => {
              await createTicket({
                variables: t,
              })
              setIsCreating(false)
              refetch()
            }}
            onCancel={() => setIsCreating(false)}
          />
        ) : (
          <Button className="bg-primary" onClick={() => setIsCreating(true)}>
            新しいTODOを追加
          </Button>
        )}
      </div>
      {loading ? <TableSkeleton /> : <></>}
      {data?.getTickets?.map((ticket) => (
        <div
          key={`ticket-${ticket.ticketId}`}
          className="bg-white p-4 rounded-lg shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold w-full">
              <EditableTextField
                value={ticket.title}
                onSave={async (title) => {
                  await updateTicket({
                    variables: {
                      ticketId: ticket.ticketId,
                      title,
                    },
                  })
                  refetch()
                }}
              />
            </h3>
            <div className="flex space-x-2">
              <DeleteButton
                onDelete={async () => {
                  await deleteTicket({
                    variables: {
                      ticketId: ticket.ticketId,
                    },
                  })
                  refetch()
                }}
              />
            </div>
          </div>
          <div className="mb-2">
            <EditableTextField
              value={ticket.description ?? ''}
              onSave={async (description) => {
                await updateTicket({
                  variables: {
                    ticketId: ticket.ticketId,
                    description,
                  },
                })
                refetch()
              }}
              inputType="textarea"
            />
          </div>
          <p className="text-sm text-gray-500">
            期限:&nbsp;
            <EditableDateTimeField
              value={ticket.deadline ? new Date(ticket.deadline) : undefined}
              onSave={async (deadline) => {
                await updateTicket({
                  variables: {
                    ticketId: ticket.ticketId,
                    deadline,
                  },
                })
                refetch()
              }}
            />
          </p>
          <p className="pt-1 text-xs text-gray-400">
            作成日時:&nbsp;{formatDate(new Date(ticket.createdAt))}
          </p>
          <p className="text-xs text-gray-400">
            更新日時:&nbsp;{formatDate(new Date(ticket.updatedAt))}
          </p>
        </div>
      ))}
    </div>
  )
}
