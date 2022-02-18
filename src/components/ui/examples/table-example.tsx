import React, { Dispatch, FC, SetStateAction, useState, useEffect } from 'react'
import {
  BodyText,
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
  InputGroup
} from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { propertiesApiService } from '../../../platform-api/properties-api'
import { propertiesUpdateApiService } from '../../../platform-api/properties-update-api'
import { PropertyModelPagedResult, UpdatePropertyModel } from '@reapit/foundations-ts-definitions'

export const handleOnCloseModal =
  (setIndexExpandedRow: Dispatch<SetStateAction<number | null>>, closeModal: () => void) => () => {
    setIndexExpandedRow(null)
    closeModal()
  }

export const TableExample: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [propertiesTypes, setPropertiesTypes] = useState<PropertyModelPagedResult>()
  const [updatePropertiesTypes, setUpdatePropertiesTypes] = useState<UpdatePropertyModel>()
  const [newAddress,setNewAddress]=useState('')

  useEffect(() => {
    const fetchPropertiesConfigs = async () => {
      
      const serviceResponse = await propertiesApiService(connectSession)

      if (serviceResponse) {
        setPropertiesTypes(serviceResponse)
      }
    
    }

    if (connectSession) {
      fetchPropertiesConfigs()
    }
  }, [connectSession])

  useEffect(() => {
    const fetchUpdatePropertiesConfigs = async () => {
      
      const serviceResponse = await propertiesUpdateApiService(connectSession)

      if (serviceResponse) {
        setUpdatePropertiesTypes(serviceResponse)
      }
    
    }

    if (connectSession) {
      fetchUpdatePropertiesConfigs()
    }
  }, [connectSession])


  const [indexExpandedRow, setIndexExpandedRow] = useState<number | null>(null)
  const { Modal, openModal, closeModal } = useModal()

  const updateAddress =(e : any)=>{
    console.log(e)
  }

  const handleChange=(e: React.ChangeEvent<HTMLInputElement >) => {
    setNewAddress(e.target.value)
  }

  console.log(newAddress)

  console.log(updatePropertiesTypes)


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
            rows={propertiesTypes?._embedded?.map(({ id, created, modified, marketingMode,address }) => ({
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
                    <form>
                      <FormLayout hasMargin>
                        <InputWrap>
                          <InputGroup contentEditable icon="homeSystem" label="Address" type="text" defaultValue={address?.line1} onChange={handleChange} />
                        </InputWrap>
                      </FormLayout>
                    </form>
                    
                    <ButtonGroup alignment="center">
                      <Button intent="primary" chevronRight type="submit" onClick={()=>updateAddress(id)}>
                        Update Address
                      </Button>
                      <Button intent="primary" chevronRight type="submit" onClick={openModal}>
                        Open Modal
                      </Button>
                    </ButtonGroup>
                  </>
                ),
              },
            }))}
          /> 
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
