import React, { Dispatch, FC, SetStateAction, useState, useEffect } from 'react'
import {
  BodyText,
  Button,
  ButtonGroup,
  elMb6,
  elMb7,
  // elSpan2,
  PersistantNotification,
  // StatusIndicator,
  Table,
  Title,
  useModal,
} from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { propertiesApiService } from '../../../platform-api/properties-api'
import { PropertyModelPagedResult } from '@reapit/foundations-ts-definitions'
// import { openNewPage } from '../../utils/navigation'

export const handleOnCloseModal =
  (setIndexExpandedRow: Dispatch<SetStateAction<number | null>>, closeModal: () => void) => () => {
    setIndexExpandedRow(null)
    closeModal()
  }

export const TableExample: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [propertiesTypes, setPropertiesTypes] = useState<PropertyModelPagedResult[]>([])
  // const [loading, setLoading] = useState<boolean>(false)

 

  useEffect(() => {
    const fetchPropertiesConfigs = async () => {
      // setLoading(true)
      const serviceResponse = await propertiesApiService(connectSession)

      // console.log(serviceResponse)
      if (serviceResponse) {
        setPropertiesTypes(serviceResponse)
      }
      // setLoading(false)
    }

    if (connectSession) {
      fetchPropertiesConfigs()
    }
  }, [connectSession])


  const [indexExpandedRow, setIndexExpandedRow] = useState<number | null>(null)
  const { Modal, openModal, closeModal } = useModal()

  console.log(propertiesTypes._embedded)

  return (
    <>
      <Title>Properties for Sale</Title>
      <PersistantNotification className={elMb7} isExpanded intent="secondary" isInline isFullWidth>
        Straight from the Elements docs, the customised table example also has a button in the slide down that triggers
        a Modal dialogue. The custom setIndexExpandedRow function allows a callback to collapse the row when the modal
        is closed.
      </PersistantNotification>
       <Table
        indexExpandedRow={indexExpandedRow}
        setIndexExpandedRow={setIndexExpandedRow}
            rows={propertiesTypes._embedded.map(({ id, created, modified, marketingMode }) => ({
              cells: [
                {
                  label: 'ID',
                  value: id ?? '',
                  narrowTable: {
                    showLabel: true,
                  },
                },
                {
                  label: 'Created',
                  value: created ?? '',
                  narrowTable: {
                    showLabel: true,
                  },
                },
                {
                  label: 'Modified',
                  value: modified ?? '',
                  narrowTable: {
                    showLabel: true,
                  },
                },
                {
                  label: 'Marketing Mode',
                  value: marketingMode ?? '',
                  narrowTable: {
                    showLabel: true,
                  },
                },
              ],
              expandableContent: {
                content: (
                  <>
                    <BodyText hasGreyText>
                      You may wish to put either calls to action or forms in here that relate to the selected table row.
                    </BodyText>
                    <ButtonGroup alignment="center">
                      <Button intent="primary" chevronRight type="submit" onClick={openModal}>
                        Open Modal
                      </Button>
                    </ButtonGroup>
                  </>
                ),
              },
            }))}
          /> 
  
      {/* <Table
        // numberColumns={9}
        indexExpandedRow={indexExpandedRow}
        setIndexExpandedRow={setIndexExpandedRow}
        rows={[
          {
            cells: [
              {
                label: 'Property',
                value: 'Mt Ash Jacket, Brassey Road',
                className: elSpan2,
                icon: 'homeSystem',
                cellHasDarkText: true,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Customer',
                value: 'Mr Johnny Corrigan',
                icon: 'usernameSystem',
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Client A/C',
                value: 'Alternate Lettings Client Acc',
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Description',
                value: 'Tenant Payment Request',
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Request Date',
                value: '19 Apr 2021',
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Amount',
                value: '£50.00',
                cellHasDarkText: true,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Payment Status',
                value: 'Not Requested',
                statusCircleIntent: 'danger',
                narrowTable: {
                  showLabel: true,
                },
              },
            ],
            expandableContent: {
              content: (
                <>
                  <BodyText hasGreyText>
                    You may wish to put either calls to action or forms in here that relate to the selected table row.
                  </BodyText>
                  <ButtonGroup alignment="center">
                    <Button intent="primary" chevronRight type="submit" onClick={openModal}>
                      Open Modal
                    </Button>
                  </ButtonGroup>
                </>
              ),
            },
          },
          {
            cells: [
              {
                label: 'Property',
                value: 'Property Name, Road Name',
                className: elSpan2,
                icon: 'homeSystem',
                cellHasDarkText: true,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Customer',
                value: 'Mrs Davina Corrigan',
                icon: 'usernameSystem',
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Client A/C',
                value: 'Alternate Lettings Client Acc',
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Description',
                value: 'Another descriptions',
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Request Date',
                value: '23rd Apr 2021',
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Amount',
                value: '£665.21',
                cellHasDarkText: true,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Payment Status',
                value: 'Pending',
                children: (
                  <>
                    <StatusIndicator intent="critical" /> Pending
                  </>
                ),
                narrowTable: {
                  showLabel: true,
                },
              },
            ],
            expandableContent: {
              content: (
                <>
                  <BodyText hasGreyText>
                    You may wish to put either calls to action or forms in here that relate to the selected table row.
                  </BodyText>
                  <ButtonGroup alignment="center">
                    <Button intent="primary" chevronRight type="submit" onClick={openModal}>
                      Open Modal
                    </Button>
                  </ButtonGroup>
                </>
              ),
            },
          },
        ]}
      /> */}
      <Modal title="Modal Opened">
        <PersistantNotification className={elMb6} isExpanded isInline isFullWidth intent="danger">
          Closing me will collapse the table row
        </PersistantNotification>
        <BodyText hasGreyText>Typically Modals are used to confirm or deny things.</BodyText>
        <ButtonGroup alignment="center">
          <Button intent="secondary" onClick={handleOnCloseModal(setIndexExpandedRow, closeModal)}>
            Close
          </Button>
        </ButtonGroup>
      </Modal>
    </>
  )
}

export default TableExample
