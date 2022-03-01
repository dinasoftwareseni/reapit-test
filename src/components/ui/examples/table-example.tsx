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
// import { propertiesUpdateApiService } from '../../../platform-api/properties-update-api'
import { PropertyModelPagedResult, UpdatePropertyModel } from '@reapit/foundations-ts-definitions'
import { URLS, BASE_HEADERS } from '../../../constants/api'

export const handleOnCloseModal =
  (setIndexExpandedRow: Dispatch<SetStateAction<number | null>>, closeModal: () => void) => () => {
    setIndexExpandedRow(null)
    closeModal()
  }

export const TableExample: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [propertiesTypes, setPropertiesTypes] = useState<PropertyModelPagedResult>()
  // const [updatePropertiesTypes, setUpdatePropertiesTypes] = useState<UpdatePropertyModel>()
  const [newAddress, setNewAddress] = useState('')

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

  // useEffect(() => {
  //   const fetchUpdatePropertiesConfigs = async () => {

  //     const serviceResponse = await propertiesUpdateApiService(connectSession)

  //     console.log(serviceResponse)

  //     if (serviceResponse) {
  //       setUpdatePropertiesTypes(serviceResponse)
  //     }

  //   }

  //   if (connectSession) {
  //     fetchUpdatePropertiesConfigs()
  //   }
  // }, [connectSession])


  const [indexExpandedRow, setIndexExpandedRow] = useState<number | null>(null)
  const { Modal, openModal, closeModal } = useModal()

  // const updateAddress = (e: any) => {
  //   console.log(e)

  //   const fetchUpdatePropertiesConfigs = async (e) => {

  //     const serviceResponse = await propertiesUpdateApiService(connectSession,e)

  //     // console.log(serviceResponse)

  //     if (serviceResponse) {
  //       setUpdatePropertiesTypes(serviceResponse)
  //     }

  //   }

  //   if (connectSession) {
  //     fetchUpdatePropertiesConfigs(e)
  //   }
  // }

  const updateAddress = async (id:string,etag)=>{
    console.log('ID: '+id)
    console.log('etag: '+etag)
    
       
    const res = await fetch(`${window.reapit.config.platformApiUrl}${URLS.PROPERTIES_TYPES}${id}`, {
      // mode:'no-cors',
      method:'PATCH',
      headers: {
        // 'Access-Control-Allow-Origin': `${window.reapit.config.platformApiUrl}`,
        // 'Access-Control-Allow-Headers':'*',
        'accept':'application/json',
        'If-Match': '\"C39C4C92F5E24CA68BACA889F2C958F7\"',
        'Content-Type': 'application/json-patch+json',
        'api-version': '2020-01-31',
        'Authorization': `Bearer ${connectSession?.accessToken}`,
      },
      body:{
        "strapline": null,
        "description": "We are delighted to offer for sale this EXTENDED THREE BEDROOMED SEMI DETACHED PROPERTY situated in a much sought after residential location of Greasby, having the benefits of two separate entertaining rooms, morning room, extended kitchen. To the first floor there are three bedrooms, spacious family bathroom, gas central heating gardens front and rear and off road parking.",
        "summary": null,
        "alternateId": "10002",
        "address": {
          "buildingName": null,
          "buildingNumber": "15",
          "line1": "Example street tesss123",
          "line2": "Solihull",
          "line3": "West Midlands",
          "line4": "",
          "postcode": "B91 2XX",
          "countryId": "GB",
          "geolocation": {
            "latitude": 52.4158586,
            "longitude": 1.7773383
          }
        },
        "bedrooms": 4,
        "receptions": 1,
        "bathrooms": 2,
        "councilTax": "A",
        "internetAdvertising": true,
        "viewingArrangements": "Accompanied viewings after 3PM only",
        "videoUrl": "https://www.example.com/property/123/videoTour",
        "videoCaption": "Virtual property tour",
        "video2Url": "https://www.example.com/property/123/3dVideoTour",
        "video2Caption": "3d virtual property tour",
        "notes": "Property was on the market previously with another agent but struggled to get much interest",
        "longDescription": "The ground floor accommodation comprises of a spacious reception hall with a wet bar, a grand drawing room, master bedroom suite and a further bedroom suite. The lower floor comprises of an eat in kitchen leading to converted vaults which could be used as staff accommodation or a study. There is also separate dining room and a further bedroom suite.",
        "boardStatus": "FS",
        "boardNotes": "Include 'sold in a week' slip",
        "boardUpdated": "2021-07-02",
        "epc": {
          "exempt": false,
          "eer": 45,
          "eerPotential": 71,
          "eir": 53,
          "eirPotential": 81
        },
        "externalArea": {
          "type": "acres",
          "min": 1,
          "max": 2
        },
        "internalArea": {
          "type": "squareFeet",
          "min": 1500,
          "max": 2000
        },
        "selling": {
          "instructed": "2018-11-18",
          "price": 250000,
          "qualifier": "askingPrice",
          "status": "underOffer",
          "disposal": "privateTreaty",
          "completed": "2019-08-27",
          "exchanged": "2019-08-15",
          "accountPaid": "2019-08-29",
          "tenure": {
            "type": "leasehold",
            "expiry": "2019-05-01"
          },
          "sellingAgency": "ownToSell",
          "agencyId": null,
          "fee": {
            "type": "fixed",
            "amount": 1900
          },
          "recommendedPrice": 450000,
          "brochureId": null,
          "decoration": [
            "good",
            "veryGood"
          ]
        },
        "letting": {
          "instructed": "2018-11-18",
          "availableFrom": "2018-12-26",
          "availableTo": "2019-03-23",
          "rent": 750,
          "rentFrequency": "monthly",
          "furnishing": [
            "furnished",
            "partFurnished"
          ],
          "term": "long",
          "status": "toLet",
          "agentRole": "managed",
          "landlordId": "LLD210001",
          "brochureId": null,
          "managementFee": {
            "type": "percentage",
            "amount": 11.8
          },
          "lettingFee": {
            "type": "fixed",
            "amount": 190
          },
          "qualifier": "askingRent",
          "utilities": {
            "gasCompanyId": "OXF21000007",
            "gasMeterPoint": "312123",
            "electricityCompanyId": "OXF21000009",
            "electricityMeterPoint": "123876",
            "waterCompanyId": "OXF21000008",
            "waterMeterPoint": "34666",
            "telephoneCompanyId": "OXF21000012",
            "internetCompanyId": "OXF21000010",
            "cableTvCompanyId": "OXF21000011"
          }
        },
        "type": [
          "house"
        ],
        "style": [
          "detached"
        ],
        "situation": [
          "garden",
          "land",
          "patio"
        ],
        "parking": [
          "secure",
          "doubleGarage"
        ],
        "age": [
          "period"
        ],
        "locality": [
          "rural",
          "village"
        ],
        "negotiatorId": "JAS",
        "officeIds": [
          "OXF",
          "SOL"
        ],
        "areaId": "BRM",
        "metadata": {
          "CustomField1": "CustomValue1",
          "CustomField2": true
        }
      }
    })

    // 'Content-Type': 'application/json-patch+json',

    const result = await res.json()
    console.log('result:'+result)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress(e.target.value)
  }

  console.log(propertiesTypes)




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
        rows={propertiesTypes?._embedded?.map(({ id, created, modified, marketingMode, address, _eTag }) => ({
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
                      <InputGroup
                        contentEditable icon="homeSystem"
                        label="Address"
                        type="text"
                        defaultValue={address?.line1}
                        onChange={handleChange}
                      />
                    </InputWrap>
                  </FormLayout>
                </form>

                <ButtonGroup alignment="center">
                  <Button intent="primary" chevronRight type="submit" onClick={() => updateAddress(id!, _eTag)}>
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
