import React, { Dispatch, FC, SetStateAction, useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import {
  Button,
  ButtonGroup,
  elMb6,
  elMb7,
  PersistantNotification,
  Table,
  Title,
  useModal,
  FormLayout,
  InputWrap,
  InputGroup,
  Input,
  CardWrap,
  Icon,
} from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { propertiesApiService } from '../../../platform-api/properties-api'
import { PropertyModelPagedResult } from '@reapit/foundations-ts-definitions'
import { URLS } from '../../../constants/api'
// import { DetailsPage } from './details'
import { Routes } from '../../../constants/routes'

export const handleOnCloseModal =
  (setIndexExpandedRow: Dispatch<SetStateAction<number | null>>, closeModal: () => void) => () => {
    setIndexExpandedRow(null)
    closeModal()
  }

export const TableExample: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [propertiesTypes, setPropertiesTypes] = useState<PropertyModelPagedResult>()
  const [addressLine1, setAddressLine1] = useState('')
  const [addressLine2, setAddressLine2] = useState('')
  const [addressPostcode, setAddressPostcode] = useState('')
  const [search, setSearch] = useState('')
  const [indexExpandedRow, setIndexExpandedRow] = useState<number | null>(null)
  const { Modal, openModal, closeModal } = useModal()
  const [newId, setNewId] = useState('')

  let history = useHistory();

  const fetchPropertiesConfigs = async () => {
    const serviceResponse = await propertiesApiService(connectSession)

    if (serviceResponse) {
      setPropertiesTypes(serviceResponse)
    }
  }

  const fetchSearch = async (search: string) => {
    console.log(search)
    setSearch(search)
    const res = await fetch(`${window.reapit.config.platformApiUrl}${URLS.PROPERTIES_SEARCHBYADDRESS_TYPES}${search}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'api-version': '2020-01-31',
        Authorization: `Bearer ${connectSession?.accessToken}`,
      },
    })

    if (res.ok) {
      setPropertiesTypes(await res.json())
    }
  }

  useEffect(() => {
    if (connectSession) {
      fetchPropertiesConfigs()
    }
  }, [connectSession])

  const updateAddress = async (id: string, etag) => {
    console.log('ID: ' + id)
    console.log('etag: ' + etag)
    openModal()

    await fetch(`${window.reapit.config.platformApiUrl}${URLS.PROPERTIES_TYPES}${id}`, {
      method: 'PATCH',
      headers: {
        accept: 'application/json',
        'If-Match': etag,
        'Content-Type': 'application/json-patch+json',
        'api-version': '2020-01-31',
        Authorization: `Bearer ${connectSession?.accessToken}`,
      },
      body: JSON.stringify({
        address: {
          line1: addressLine1,
          line2: addressLine2,
          postcode: addressPostcode,
        },
      }),
    })
  }

  const handleChangeAddressLine1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressLine1(e.target.value)
  }

  const handleChangeAddressLine2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressLine2(e.target.value)
  }

  const handleChangeAddressPostcode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressPostcode(e.target.value)
  }

  const toggleDetails = (id:string,description:string, line1:string, marketingMode:string) => {  
    history.push(Routes.DETAILS,{id,description,line1,marketingMode})
    
  }

  return (
    <>
      <Title>Properties for Sale</Title>
      <PersistantNotification className={elMb7} isExpanded intent="secondary" isInline isFullWidth>
        Straight from the Elements docs, the customised table example also has a button in the slide down that triggers
        a Modal dialogue. The custom setIndexExpandedRow function allows a callback to collapse the row when the modal
        is closed.
      </PersistantNotification>

      <CardWrap>
        <InputGroup>
          <Input
            id="myId2"
            type="tel"
            placeholder="Search by Address"
            value={search}
            onChange={(e) => fetchSearch(e.target.value)}
          />
          <Icon icon="searchSystem" />
        </InputGroup>
      </CardWrap>

      <Table
        indexExpandedRow={indexExpandedRow}
        setIndexExpandedRow={setIndexExpandedRow}
        rows={propertiesTypes?._embedded?.map(
          ({ id, created, modified, marketingMode, currency, address, selling, _eTag, description }) => ({
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
              label: 'Currency',
              value: currency ?? '',
              narrowTable: {
                showLabel: true,
              },
            },
            {
              label: 'Price',
              value: selling?.price ?? '',
              narrowTable: {
                showLabel: true,
              },
            },
            {
              label: 'Address',
              value: address?.line1 ?? '',
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
            {
              label: 'Action',
              value: <Button intent="primary" onClick={()=>toggleDetails(id!,description!, address?.line1!, marketingMode!)}>Show Details</Button>,
              narrowTable: {
                showLabel: true,
              },
            },
          ],
          expandableContent: {
            content: (
              <>
                <form>
                  <FormLayout hasMargin>
                    <InputWrap>
                      <InputGroup
                        contentEditable icon="homeSystem"
                        label="Address (Line1)"
                        type="text"
                        value={addressLine1===''? address?.line1:addressLine1}
                        onChange={handleChangeAddressLine1}
                      />
                      <InputGroup
                          contentEditable icon="homeSystem"
                          label="Address (Line2)"
                          type="text"
                          value={addressLine2===''? address?.line2:addressLine2}
                          onChange={handleChangeAddressLine2}
                      />
                       <InputGroup
                          contentEditable icon="homeSystem"
                          label="Postcode"
                          type="text"
                          value={addressPostcode===''? address?.postcode:addressPostcode}
                          onChange={handleChangeAddressPostcode}
                      />
                    </InputWrap>
                  </FormLayout>
                </form>

                <ButtonGroup alignment="center">
                  <Button intent="primary" chevronRight type="submit" onClick={() => updateAddress(id!, _eTag)}>
                    Update Address
                  </Button>
                </ButtonGroup>
              </>
            ),
          },
    }),
        )}
      />
      <Modal title="Update Confirmation">
        <PersistantNotification className={elMb6} isExpanded isInline isFullWidth intent="danger">
          Are you sure update address ?
        </PersistantNotification>
        <ButtonGroup alignment="center">
          <Button intent="secondary" onClick={handleOnCloseModal(setIndexExpandedRow, closeModal)}>
            Yes
          </Button>
        </ButtonGroup>
      </Modal>
      {/* <DetailsPage id={newId}/> */}
    </>
  )
}

export default TableExample
